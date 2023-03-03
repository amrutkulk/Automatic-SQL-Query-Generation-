from flask import Flask, render_template, request, jsonify
import mysql.connector
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
)
# Provide template folder name
# The default folder name should be "templates" else need to mention custom folder name
app = Flask(__name__, template_folder='templateFiles', static_folder='staticFiles')

#showing tables on main page using cursor and executong query
mycursor=mydb.cursor()
query_1 = "SHOW TABLES FROM practice"
a=[]
mycursor.execute(query_1)
myresult = mycursor.fetchall()
for x in range(len(myresult)):
    a.append(str(myresult[x][0]))
    print(str(myresult[x][0]))

global_arr=[]
column_name=[]

@app.route('/', methods=['POST','GET'])

def index():
   
    print("----------------------")
    table_name = request.form.get('table_name')
    print(table_name)
    if(table_name!=None):
        global_arr.append(table_name)
        print(global_arr)
        
        qu='SHOW COLUMNS FROM practice.'+table_name
        mycursor2=mydb.cursor();
        mycursor2.execute(qu);
        myresult2=mycursor2.fetchall();
        
        print(myresult2)
        if myresult2!=None:
            if len(global_arr)==1:
                for col_name in range(len(myresult2)):
                    for y in range(len(myresult2[col_name])):
                        column_name.append(myresult2[0][y])
        
        print(column_name)
        
    
    
    return render_template('index.html',myresult=a,global_arr=global_arr)
 
if __name__=='__main__':
    app.run(debug = True)