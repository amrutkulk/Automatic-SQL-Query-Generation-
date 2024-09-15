from flask import Flask, render_template, request, jsonify,json,url_for,session,redirect
from flask_sqlalchemy import SQLAlchemy
from flask_mysqldb import MySQL
import MySQLdb.cursors
from flask_login import UserMixin
import pandas as pd
import re
import mysql.connector
import os
import sys
import subprocess
import time
# from werkzeug.serving import run_with_reloader

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
)
# mydb2= mysql.connector.connect(
#     host="localhost",
#     user="root",
#     password="",
#     data
# )

# Provide template folder name
# The default folder name should be "templates" else need to mention custom folder name
app = Flask(__name__, template_folder='templateFiles', static_folder='staticFiles')
app.secret_key = 'viratisbetterthanyash'

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'register'

mysql =MySQL(app)

@app.route('/login', methods=['GET','POST'])
def login():
    mesage = ''
    if request.method == 'POST' and 'email' in request.form and 'password' in request.form:
        email = request.form['email']
        password = request.form['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE email=% s AND password = % s', (email,password, ))
        users = cursor.fetchone()
        
        if users:
            session['loggedin'] = True
            session['userid'] = users['userid']
            session['name'] = users['name']
            session['email'] = users['email']
            mesage = 'Logged in Successfully !'
            return redirect('/home')
            # return render_template('home.html',mesage=mesage)
        else:
            mesage = 'please enter correct email/password !'
    
    return render_template('login.html',mesage=mesage)

@app.route('/logout')
def logout():
    session.pop('loggedin',None)
    session.pop('user_id',None)
    session.pop('email',None)
    return redirect(url_for('login'))


@app.route('/')
@app.route('/register', methods=['GET','POST'])
def register():
    mesage = ''
    if request.method == 'POST' and 'name' in request.form and 'password' in request.form and 'email' in request.form :
        userName = request.form['name']
        password = request.form['password']
        email = request.form['email']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE email = % s', (email, ))
        account = cursor.fetchone()
        if account:
            mesage = 'Account already exist !'
        elif not re.match(r'[^@]+@[^@]+\.[^@]+',email):
            mesage = 'Invalid Email Address!'
        elif not userName or not password or not email:
            mesage = 'Please fill out the form!'
        else:
            cursor.execute('INSERT INTO users VALUES(NULL, % s, % s, % s)', (userName,email,password,))
           
            
            mysql.connection.commit()
            mesage = 'You have successfully registered!'
            
    elif request.method == 'POST':
        mesage = 'Please fill out the form !'
    return render_template('register.html',mesage=mesage)



a=[]
global_arr=[]
# home page
@app.route('/home')
def home():
    if 'loggedin' in session:
        return render_template('home.html')
    else:
        return redirect(url_for('login', message='Login first'))

@app.route('/sql_notes')
def sql_notes():
    return render_template('sql_notes.html')




# @app.route('/restart-server')
# def restart_server():
#     # Restart Flask server using subprocess
#     # subprocess.Popen(['taskkill', '/F', '/IM', 'python.exe'], shell=True)  
#     # time.sleep(2)  
#     subprocess.Popen([r'C:\Users\sande\Python 37\python.exe', r'c:\xampp\htdocs\SQL_Query_Generator\app.py'])  # Start the Python script
#     time.sleep(5)  # Wait for the Flask server to start

#     # Return response to AJAX call
#     return 'Flask server has been restarted!'


start_index=0

dict={}
list1=[]
list2=[]
list3=[]
myresult4 = []
global_list_for_len2=[]
global_list=[]


@app.route('/dropdown')
def dropdown():
    # create a list of items for the dropdown
    mycursor12 = mydb.cursor()
    mycursor12.execute("SELECT schema_name FROM information_schema.schemata")
    databases = mycursor12.fetchall()
    db_names = [db[0] for db in databases]
    
    # get the current value of item_dropdown from the session
    # session.clear()
    session.pop('item_dropdown', None)
    item_dropdown = session.get('item_dropdown')
    
    # pass the list of items and the current value of item_dropdown to the dropdown template
    return render_template('dropdown.html', items=db_names, item_dropdown=item_dropdown)


@app.route('/demo', methods=['POST','GET'])
def demo():
    # get the current value of item_dropdown from the session, or from the request form if it is not in the session
    a.clear()
    item_dropdown = session.get('item_dropdown', request.form.get('dropdown'))
    
    if not item_dropdown:
        return "Dropdown value is missing."
    
    # store the current value of item_dropdown in the session
    session['item_dropdown'] = item_dropdown
    
    print(item_dropdown)
    print("+++++++++++++++++++++++++==")
    data_base_name = item_dropdown

    #showing tables on main page using cursor and executong query
    mycursor=mydb.cursor()
    query_1 = "SHOW TABLES FROM "+data_base_name

    mycursor.execute(query_1)
    myresult = mycursor.fetchall()
    for x in range(len(myresult)):
        a.append(str(myresult[x][0]))
    # print(str(myresult[x][0]))
   
    # create a list of values for the selected item
    # values_dropdown = ['value1', 'value2', 'value3', 'value4', 'value5']
    values_dropdown = a
    # pass the item and values to the selected template
    
    global start_index
    table_after_append=[]
    table_before_append=[]
    query_list=[]
    df=pd.DataFrame()
    # Convert DataFrame to HTML table
    html_table = df.to_html()
   
    column_name=[]
    print("----------------------")
    table_name = request.form.get('table_name')
    print(table_name)
    ye_bhi_output = request.form.get('ye_bhi_output')
    making_clear = request.form.get('making_clear')
    create_value = request.form.get('create_value')
    user_id = request.form.get('user_id')
    id_lele_bhai = request.form.get('id_lele_bhai')
    no_dede_bhai = request.form.get('no_dede_bhai')
    timepass = request.form.get('timepass')
    if timepass=="timepass":
        name = request.form['name']
        phy = request.form['phy']
        che = request.form['che']
        maths = request.form['maths']
        
        total = int(phy) + int(che) + int(maths)
        perc = (total * 100) / 300

        # Use placeholders and pass values as a tuple to execute method
        trigger_query = "INSERT INTO register.stud_marks (`trig_id`, `phy`, `che`, `maths`, `total`, `perc`) VALUES ('', %s, %s, %s, %s, %s)"
        values = (phy, che, maths, total, perc)
        mycursor18=mydb.cursor();
        mycursor18.execute(trigger_query, values)
        mydb.commit()

        return "Grades"
    if no_dede_bhai == 'no dede bhai':
        sql_query_for_no = request.form.get('sql_query')
        user_id = request.form.get('user_id')
        print(user_id)
        
        if user_id!=None:
            mycursor6 = mydb.cursor()
            # cursor_query = "SELECT queries FROM register.users_queries WHERE userid=1"
            # mycursor6.execute(cursor_query)
            cursor_query = "SELECT queries FROM register.users_queries WHERE userid = %s"
            mycursor6.execute(cursor_query, (user_id,))
            myresult_query=mycursor6.fetchall()
            print(myresult_query)
                            
            query_list = [q[0] for q in myresult_query]
                        
            print(query_list)
            return query_list
    if id_lele_bhai=='id lele bhai':
        uid=request.form.get('user_id')
        print(uid)
        print("uid")
        
       
        if uid!=None:
            mycursor6 = mydb.cursor()
            cursor_query = "SELECT queries FROM register.users_queries WHERE userid="+uid
            mycursor6.execute(cursor_query)
            myresult_query=mycursor6.fetchall()
            print(myresult_query)
                            
            query_list = [q[0] for q in myresult_query]
                        
            print(query_list)
            
        return query_list
                
            
            
            
    
            
       
                
       
            
        
    if making_clear == 'making_clear':
        print("hi")
        sql_query = request.form.get('sql_query')
        
        
        # cursor6 = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        # mycursor=mydb.cursor()
        # cursor6.execute('INSERT INTO users_queries VALUES(NULL, % s, % s,NULL)',(user_id,sql_query))
        
        
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('INSERT INTO users_queries VALUES(NULL, % s, % s,NULL)',(user_id,sql_query,))
        mysql.connection.commit()
        print(user_id)
        print(sql_query)
        column_name.clear()
        

        # Refresh the page
        # print("Start ho ja ayrr")
        return "message"
        
        
       
       
        
        # print(query_to_insert)
        # mycursor.execute(query_to_insert)
        # return render_template('index.html',html_table="", myresult=[],global_arr=[],column_name=[],dict={},list1=[],list2=[],list3=[],global_list=[],global_list_for_len2=[])
        # return render_template('index.html',html_table=html_table, myresult=a,global_arr=global_arr,column_name=column_name,dict=dict,list1=list1,list2=list2,list3=list3,global_list=global_list,global_list_for_len2=global_list_for_len2)
        
   
        #ye bas timepass ke liye nahi he output function is also running in index,html   
    if(ye_bhi_output == 'ye_bhi_output_he'):
        query = request.form.get('fetch_output')
        print("ye_bhi_output");
            # json_output_textarea = json.loads(query)
        print(global_arr)
            # print(json_output_textarea)
        new_word=""
        for word in query.split():
            if word in global_arr:
                new_word = new_word+" "+data_base_name+"."+word
            else:
                new_word = new_word+" "+word
        print(query)
        print(new_word)
        try:
            frame = pd.read_sql(new_word,mydb)
            html_table = frame.to_html(classes='table table-stripped table-dark my-4', table_id='my-table')
            return jsonify({'html_table': html_table})
        except pd.errors.DatabaseError as e:
            error_message = str(e)
            # Add code to show error message in an alert or log it
            return jsonify({'html_table': '', 'error_message': error_message})
        
    if create_value == "ye create kar":
        mycursor3=mydb.cursor()
        mycursor3.execute("SHOW TABLES FROM "+data_base_name)
        myresult3=mycursor3.fetchall()
        for x in range(len(myresult3)):
            table_before_append.append(str(myresult3[x][0]))
            
        create_table = request.form.get("create_table")
        check_array = request.form.getlist("checkboxchecked[]")
        print(create_table)
        print(check_array)
            
        create_query1 = "CREATE TABLE "+data_base_name+"."+create_table+"("
        create_query2=""
            
        for x in range(len(check_array)):
            if x==(len(check_array) - 1):
                    create_query2 = create_query2+check_array[x]+" varchar(255)"
            else:
                create_query2 = create_query2+check_array[x]+" varchar(255),"
                    
        create_query3 = ")"
        mycursor4=mydb.cursor()
        create_query4 = create_query1+create_query2+create_query3
        print(create_query4)
        mycursor4.execute(create_query4)
            
        mycursor=mydb.cursor()
        mycursor.execute("SHOW TABLES FROM "+data_base_name)
        myresut5=mycursor.fetchall()
        for x in range(len(myresut5)):
            table_after_append.append(str(myresut5[x][0]))
                
        one_not_two = set(table_after_append) - set(table_before_append)
        print("ONE NOT TWO IS : ")
        print(one_not_two)
        dummy=list(one_not_two)
            
        return list(one_not_two)            
    if(table_name!=None):
        
        if len(global_arr) < 3:  # add this condition to check the length of global_arr
            global_arr.append(table_name)
            print(global_arr)
                
            
            
        qu='SHOW COLUMNS FROM '+data_base_name+'.'+table_name
        mycursor2=mydb.cursor();
        mycursor2.execute(qu);
        myresult2=mycursor2.fetchall();
        myresult4.append(myresult2)
            
            
            
        print(myresult2)
            
        for y in range(len(myresult2)):
            column_name.append(myresult2[y][0])
                
            global_list.append(myresult2[y][0])
            
        print(global_list)
            
        dict[start_index]=column_name
        start_index=start_index+1
            
        print(dict)
        if 0 in dict:
           print(dict[0][1])
        
        if(start_index==1):
            for list_name in range(len(dict[0])):
                list1.append(dict[0][list_name])
                    
                    
                    
        if(start_index==2):
            for list_name in range(len(dict[1])):
                list2.append(dict[1][list_name])
                    
                    
        if(start_index==3):
            for list_name in range(len(dict[2])):
                list3.append(dict[2][list_name])
        global_list_for_len2.clear()
                    
        if len(global_arr) == 1:
            for z in range(len(myresult4)):
                for z1 in range(len(myresult4[z])):
                    global_list_for_len2.append(str(myresult4[z][z1][0]))
        elif len(global_arr) > 1:
            for z in range(len(myresult4)):
                for z1 in range(len(myresult4[z])):
                    global_list_for_len2.append(str(global_arr[z]+"."+myresult4[z][z1][0]))
            
            
    print(global_list_for_len2)
                
    print(global_arr)
    html_table = df.to_html()
    
      
    print(html_table)
    html_table=jsonify(html_table) 
    user_id = request.form.get('user_id')
    
    cnt = request.form.get("cnt");
    print("CNT :")
    print(cnt)
    if cnt is not None and int(cnt) > 0:
        global_arr.clear()
        column_name.clear()
        list1.clear()
        global_list.clear()
        dict.clear()
        list2.clear()
        list3.clear()
        global_list_for_len2.clear()
        query_list.clear()
        item_dropdown = ""
        values_dropdown.clear()
        myresult4.clear()
        cnt=0
        start_index = 0
        
    
    print(global_arr)

    return render_template('index.html',html_table=html_table, myresult=a,global_arr=global_arr,column_name=column_name,dict=dict,list1=list1,list2=list2,list3=list3,global_list=global_list,global_list_for_len2=global_list_for_len2,query_list=query_list,item_dropdown=item_dropdown, values_dropdown=values_dropdown)
        

 
 
    
    
    
if __name__=='__main__':
    app.run(debug = True)