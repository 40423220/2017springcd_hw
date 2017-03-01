var tipuesearch = {"pages":[{"url":"./pages/about/","title":"About","tags":"misc","text":"NFU-MDE104B-40423220-林易寬 倉儲: https://github.com/40423220/2017springcd_hw 簡報: https://40423220.github.io/2017springcd_hw 網誌: https://40423220.github.io/2017springcd_hw/blog/ Vimeo: https://vimeo.com/user46807821 Youtube: https://www.youtube.com/channel/UCOCiRpI5ND4RKKHHtDcDGsg"},{"url":"./Week 1.html","title":"20170222 Week 1","tags":"Course","text":"修改stunnel.conf的IP設定 Week 1_Set IP from NFU-MDE104B-40423220 on Vimeo . 心得: 還好還沒忘記, 複習一下ipconfig /all指令"},{"url":"./intro-fossil-scm.html","title":"Fossil SCM 簡介","tags":"Course","text":"Fossil SCM 是一套軟體配置管理 (Software Configuration Management) 系統, 其中包含分散式版次控管 (DVC, Distributed Version Control) 、 Wiki 、 Bug Tracking 與 Technote 等功能, 可以用來控制及追蹤軟體開發專案, 並且紀錄專案開發歷程, 在協同產品設計實習課程中, 我們除了使用 git、github 與 bitbucket 之外, 將要在區域網路與系上主幹中, 配置每班兩台的 Fossil SCM 實習主機. Fossil SCM Fossil Concepts check-in - 簽入版本: 對所開發的軟體進行改版後, 簽入倉儲的版本, 稱為簽入版本. repository - 倉儲: 包含開發專案歷程中, 所有簽入版本檔案的資料庫, 稱為倉儲. 建立新倉儲 可以使用 fossil new 或 fossil init fossil new foo.fossil or fossil init foo.fossil 表示建立一個新的倉儲專案, 且倉儲檔案名稱為 foo.fossil, 在 fossil SCM 中建立新專案時, 登入用戶名稱會成為內定的倉儲管理者, 若要指定管理者名稱, 可以附加 -A USERNAME 或 --admin-user USERNAME, 新增的倉儲就會以 USERNAME 作為管理者名稱, 且指定對應的密碼 (有關 fossil 密碼管理 ), 當使用者在近端以網際模式啟動該倉儲時 (以 fossil ui 指令) fossil SCM 會直接以管理者身份登入, 無需輸入管理者密碼. 由於 fossil SCM 的倉儲格式為 Sqlite3 資料庫檔案, 因此利用 fossil init foo.fossil 建立倉儲後, 可以利用 sqlite3 工具查驗資料庫中的欄位資料. 首先以 sqlite3 工具指令開啟 foo.fossil 資料庫檔案, 進入 sql 指令環境: sqlite3 foo.fossil 接著以 .schema user 查詢 user 資料表的欄位名稱, 然後直接讀取資料表中 login, pw 與 info 欄位中的資料: .schema user select login, pw, info from user; 其中可以發現 fossil SCM 已經使用 SHA1 hash 編碼使用者帳號對應的登入密碼, 但是當使用者 fossil clone 遠端倉儲到近端時, fossil SCM 會自動以明碼設定倉儲原管理者對應的管理密碼, 且在 fossil clone 結束後, 直接顯示在命令列視窗中 . clone $ fossil clone http://your_domain_name ~/fossils/yourdb.fossil $ fossil open ~/fossils/foo.fossil add a file $ fossil add yourfile.txt git 分支流程模型 http://nvie.com/posts/a-successful-git-branching-model/ Fossil SCM concept https://www.fossil-scm.org/xfer/doc/tip/www/concepts.wiki Why Fossil SCM? 單一檔案工具與單一檔案倉儲上的簡單便捷 版本倉儲 (repository) 可以不在工作目錄 (working directory) 中, 因此使用者可以從同一個版本倉儲, 在不同目錄中, 簽出多個版本的工作空間, 因此具有伺服器版本控制系統 (server vcs) 與分散式版次控制系統 (dvcs) 的彈性與優點. 開發歷程不可變更 (因為不提供 rebase 功能), 是優點, 也是許多人認為的缺點. 小團隊更適合使用 Fossil SCM 內建網際伺服器支援團隊間的協同合作, 不僅內建提供 wiki, blog, issue tracking, 而且可以在近端修改這些工具所管理的內容後, 提交推送到遠端. 缺乏 submodule (而是採 nested path 呈現), rebase 與 code review 整合功能 git to fossil: cd git-repo git fast-export --all | fossil import --git new-repo.fossil fossil to git: git init new-repo cd new-repo fossil export --git ../repo.fossil | git fast-import fossil 與 git 雙向同步: Bidirectional Synchronization Fossil also has the ability to synchronize with a Git repository via repeated imports and/or exports. To do this, it uses marks files to store a record of artifacts which are known by both Git and Fossil to exist at a given point in time. To illustrate, consider the example of a remote Fossil repository that a user wants to import into a local Git repository. First, the user would clone the remote repository and import it into a new Git repository: fossil clone /path/to/remote/repo.fossil repo.fossil mkdir repo cd repo fossil open ../repo.fossil mkdir ../repo.git cd ../repo.git git init . fossil export --git --export-marks ../repo/fossil.marks \\ ../repo.fossil | git fast-import \\ --export-marks=../repo/git.marks Once the import has completed, the user would need to git checkout trunk. At any point after this, new changes can be imported from the remote Fossil repository: cd ../repo fossil pull cd ../repo.git fossil export --git --import-marks ../repo/fossil.marks \\ --export-marks ../repo/fossil.marks \\ ../repo.fossil | git fast-import \\ --import-marks=../repo/git.marks \\ --export-marks=../repo/git.marks Changes in the Git repository can be exported to the Fossil repository and then pushed to the remote: git fast-export --import-marks=../repo/git.marks \\ --export-marks=../repo/git.marks --all | fossil import --git \\ --incremental --import-marks ../repo/fossil.marks \\ --export-marks ../repo/fossil.marks ../repo.fossil cd ../repo fossil push Fossil SCM 一般操作 http://www.gaia-gis.it/gaia-sins/about-fossil.html fossil clone https://www.gaia-gis.it/fossil/librasterlite \\ librasterlite.fossil 或者 fossil clone https://user:password@www.gaia-gis.it/fossil/librasterlite \\ librasterlite.fossil 將倉儲內容開啟, 放入工作目錄中 $ mkdir librasterlite $ cd librasterlite $ fossil open ../librasterlite.fossil 對工作目錄中的檔案改版後, 查詢改版情形 fossil status 選擇編輯器, 提交版本至遠端倉儲後關閉 $ export \"EDITOR=vi\" $ fossil commit $ fossil close 其他 Fossil SCM 指令: http://fossil-scm.org/index.html/help Fossil SCM 特色: Integrated Bug Tracking, Wiki, and Technotes Built-In Web Interface Self-Contained Simple Networking CGI/SCGI Enabled Autosync Robust & Reliable Free and Open-Source Fossil (4 MB) 只需要 zlib 與 stunnel (4MB), 就可以充分使用, 但是 git 則需要許多程式庫與套件才能執行 (200 MB) 參考資料 http://www.fredshack.com/docs/fossil.html"},{"url":"./vrep-introduction.html","title":"V-rep 簡介","tags":"Course","text":"V-rep (Virtual robot experimentation platform) V-rep Overview http://www.coppeliarobotics.com/assets/v-repoverviewpresentation.pdf V-rep Licenses http://www.coppeliarobotics.com/assets/v-replicensingoverview.pdf User Settings: http://www.coppeliarobotics.com/helpFiles/en/settings.htm Scene .ttt http://www.coppeliarobotics.com/helpFiles/en/scenes.htm Each scene in V-REP has eight freely configurable pages. Individual pages can be accessed (i.e. displayed) through the page selector toolbar button: Model .ttm http://www.coppeliarobotics.com/helpFiles/en/models.htm Build clean model http://www.coppeliarobotics.com/helpFiles/en/buildingAModelTutorial.htm Shapes: http://www.coppeliarobotics.com/helpFiles/en/shapes.htm Object common properties: Selectable: indicates whether the object can be selected in the scene. Objects can always be selected in the scene hierarchy. Refer also to the simSetObjectProperty function. Invisible during selection: when enabled, then the object will be invisible for the selection process (i.e. you will be able to select through the object). Ignored by depth pass: when enabled, then the object will be ignored during the depth rendering pass. The depth rendering pass is used to correctly position the red sphere for camera movements. Select base of model instead: if enabled, then selecting the object in the scene will select its first parented object marked as object is model base instead (see further down). This property is convenient when protecting a model from faulty manipulations, allowing it to be manipulated as a single entity together with other objects. Refer to the section on models and also to the simSetObjectProperty function. Don't show as inside model selection: when selected, and the object is part of a model, then the model bounding box (i.e. model selection bounding box) will not encompass that object. This is useful for invisible objects that might make the model bounding box appear too big. This property has no functional effect. Refer also to the simSetObjectProperty function. Size factor: every object can be scaled (resized) at any time, also during simulation. The size factor will be scaled in a similar way and can be accessed programmatically in order to adjust a code's behavior (e.g. child script). Imagine a 2-wheeled kinematic robot whose movement is controlled in a simple way through a child script: the child script will calculate the new position of the robot according to several parameters (wheel rotation velocity, wheel diameter and distance between the two wheels). If the user scales the robot, the child script should adjust its calculation according to the new size parameters (wheel diameter and distance between the two wheels). It can do that by using the simGetObjectSizeFactor API function. Ignored for view-fitting: objects with this item selected will not be taken into account when fitting a scene to a view while no object is selected. Usually floors and similar will be tagged as such. Refer also to the view fitting toolbar button and to the simCameraFitToView api function. Extension string: a string that describes additional object properties, mainly used by extension plugins (see also the simGetExtensionString API function). Camera visibility layers: each object in V-REP can be assigned to one or several visibility layers. If there is at least one visibility layer that matches the layer selection dialog layers, then the object will be visible when seen from a camera. By default, a shape is assigned to the first layer, a joint to the second layer, a dummy to the third layer, etc. Can be seen by: allows to specify a camera or vision sensor (or a collection containing cameras or vision sensors) that will be the only one able to see the object. Collidable: allows enabling or disabling collision detection capability for the selected collidable object. Measurable: allows enabling or disabling minimum distance calculation capability for the selected measurable object. Detectable: allows enabling or disabling proximity sensor detection capability for the selected detectable object. Clicking details allows you to edit the detectable details. Renderable: allows enabling or disabling the vision sensor detection capability for the selected renderable object. Cuttable: allows enabling or disabling the mill cutting capability for the selected cuttable object. Object is model base: indicates whether the object should act as the base of a model. An object flagged as base of model has special properties (e.g. saving or copying the object will also automatically save/copy all its children and children's children, etc.). Additionally, when such an object is selected, the selection bounding box is displayed as thick stippled lines, encompassing the whole model. Refer to models, and to the select base of model instead item above. Edit model properties: allows opening the model dialog. Object / model can transfer or accept DNA: when this feature is enabled for an object or a model, then it will share a same identifier with all of its copies. An Object or model can then transfer its DNA (i.e. copy an instance of itself) to all of its siblings (i.e. objects/models with the same identifier), via the transfer DNA toolbar button. Imagine having 100 same robots in your scene that you want to modify in a similar way: simply modify one of them, select it, then click the transfer DNA toolbar button. This item should almost always be checked for a model base (see further up), to facilitate model re-instanciation. Main script: http://www.coppeliarobotics.com/helpFiles/en/mainScript.htm editor Child scripts: http://www.coppeliarobotics.com/helpFiles/en/childScripts.htm Joints Dynamically enabled joints are joints that are in force or torque mode or that operate in hybrid fashion, and that have a shape as parent object and exactly one child object which must be a non-static shape. In addition, it is possible to involve a joint in a loop closure configuration. In that case the joint has to connect to the two shapes through a dummy-dummy link (where the link type has to be Dynamics, overlap constraint). Joint properties: http://www.coppeliarobotics.com/helpFiles/en/jointProperties.htm Joint dynamic properties: http://www.coppeliarobotics.com/helpFiles/en/jointDynamicsProperties.htm Joint control callback functions: http://www.coppeliarobotics.com/helpFiles/en/jointCtrlCallbackScripts.htm 利用 Python remote API 設定 Joints 變數: For the simxSetJointPosition function to work, the joint should not be in force/torque mode. If the joint is in force/torque mode, the motor enabled, and the position control enabled, then use the simxSetJointTargetPosition instead. Also make sure the joint is dynamically enabled. 參考程式: try: import vrep except: print ('--------------------------------------------------------------') import time def connectVREP(): vrep.simxFinish(-1) # just in case, close all opened connections clientID=vrep.simxStart('127.0.0.1',19999,True,True,5000,5) # Connect to V-REP if clientID!=-1: print ('Connected Remote Api') vrep.simxStartSimulation(clientID,vrep.simx_opmode_oneshot_wait) vrep.simxSynchronous(clientID,True) return clientID else: print ('ERROR! Error connecting Remote Api') sys.exit(0); def startSim(clientID): vrep.simxStartSimulation(clientID,vrep.simx_opmode_oneshot) def stopSim(clientID): vrep.simxStopSimulation(clientID,vrep.simx_opmode_oneshot_wait) def disconnectVREP(clientID): # Now close the connection to V-REP: vrep.simxFinish(clientID) print('Connection finished') clientID=connectVREP() ret,joint1_handler = vrep.simxGetObjectHandle(\\ clientID,\"redundantRob_joint1\",vrep.simx_opmode_oneshot_wait) ret,joint1 = vrep.simxGetJointPosition(\\ clientID,joint1_handler,vrep.simx_opmode_streaming) ret,joint2_handler = vrep.simxGetObjectHandle(\\ clientID,\"redundantRob_joint2\",vrep.simx_opmode_oneshot_wait) ret,joint2 = vrep.simxGetJointPosition(\\ clientID,joint2_handler,vrep.simx_opmode_streaming) startSim(clientID) ret,joint1 = vrep.simxGetJointPosition(\\ clientID,joint1_handler,vrep.simx_opmode_buffer) print joint1 #Get position joint 1 ret,joint2 = vrep.simxGetJointPosition(\\ clientID,joint2_handler,vrep.simx_opmode_buffer) print joint2 #Get position joint 2 ret = vrep.simxSetJointPosition(\\ clientID,joint1_handler,pi/2,vrep.simx_opmode_oneshot) #Set pi/2 to joint 1 time.sleep(2) stopSim(clientID) time.sleep(1) disconnectVREP(clientID) 利用 remote API 執行緒程式設定 Joint 變數: import threading import time import sys import traceback sys.path.insert(0, 'C:\\\\Program Files\\\\V-REP3\\\\V-REP_PRO_EDU\\\\programming\\\\Python') import vrep class Joint(threading.Thread): def __init__(self, joint_name, port): threading.Thread.__init__(self) self.client_id = -1 self.port = port self.joint_name = joint_name def run(self): try: # connect to V-REP server self.client_id = vrep.simxStart(\"127.0.0.1\", self.port, False, True, 5000, 5) if self.client_id == -1: raise Exception('Failed to connect V-REP remote API server.') # get handle res, p = vrep.simxGetObjectHandle(self.client_id, self.joint_name.encode(), vrep.simx_opmode_oneshot_wait) if res == vrep.simx_error_noerror: print('[Joint %s] handle= %s' % (self.joint_name, p)) else: raise Exception('Error in getting joint handles.') except Exception as e: print('[Joint %s] %s' % (self.joint_name, e.args[0])) traceback.print_exc() finally: # disconnect with V-REP server vrep.simxFinish(self.client_id) if __name__ == \"__main__\": joints = [Joint(\"joint1\", 19999), Joint(\"joint2\", 19998)] for joint in joints: joint.start() time.sleep(0.1) time.sleep(1) for joint in joints: joint.join() print(\"Done\") Dummy properties: http://www.coppeliarobotics.com/helpFiles/en/dummyPropertiesDialog.htm Dummy functions: http://www.coppeliarobotics.com/helpFiles/en/dummiesDescription.htm Loop closure: Dynamic simulations: http://www.coppeliarobotics.com/helpFiles/en/designingDynamicSimulations.htm#staticAndRespondable Motion planning: http://www.coppeliarobotics.com/helpFiles/en/motionPlanningModule.htm Means of communication: http://www.coppeliarobotics.com/helpFiles/en/meansOfCommunication.htm V-rep API Embedded scripts: http://www.coppeliarobotics.com/helpFiles/en/scripts.htm Lua crash course: http://www.coppeliarobotics.com/helpFiles/en/luaCrashCourse.htm http://www.lua.org/pil/contents.html Access objects: http://www.coppeliarobotics.com/helpFiles/en/accessingGeneralObjects.htm V-rep API 函式列表: http://www.coppeliarobotics.com/helpFiles/en/apiFunctionListCategory.htm V-rep 外部控制方法: http://www.coppeliarobotics.com/helpFiles/en/externalControllerTutorial.htm V-rep remote API 範例 根據 http://www.coppeliarobotics.com/helpFiles/en/remoteApiServerSide.htm 中的說明. V-rep 啟動時, 會根據系統目錄下 remoteApiConnections.txt 檔案中的設定, 啟動 rempte api 功能. 以下為 one-link robot 的 V-rep remote API 程式範例: import vrep import sys # child threaded script: # 內建使用 port 19997 若要加入其他 port, 在 serve 端程式納入 #simExtRemoteApiStart(19999) vrep.simxFinish(-1) clientID = vrep.simxStart('127.0.0.1', 19997, True, True, 5000, 5) if clientID!= -1: print(\"Connected to remote server\") else: print('Connection not successful') sys.exit('Could not connect') errorCode,Revolute_joint_handle=vrep.simxGetObjectHandle(clientID,'Revolute_joint',vrep.simx_opmode_oneshot_wait) if errorCode == -1: print('Can not find left or right motor') sys.exit() errorCode=vrep.simxSetJointTargetVelocity(clientID,Revolute_joint_handle,2, vrep.simx_opmode_oneshot_wait) while True: choice = input(\"(e to exit, p to pause and enter to exec)>\") if choice == \"e\": print(\"exiting\") vrep.simxStopSimulation(clientID, vrep.simx_opmode_oneshot_wait) break elif choice == \"p\": vrep.simxPauseSimulation(clientID, vrep.simx_opmode_oneshot_wait) else: vrep.simxStartSimulation(clientID, vrep.simx_opmode_oneshot_wait) V-rep Remote API 呼叫模式 http://www.coppeliarobotics.com/helpFiles/en/remoteApiModusOperandi.htm 當 V-rep remote API 需要送出資料讓三軸同動時: simxPauseCommunication(clientID,1); simxSetJointPosition(clientID,joint1Handle,joint1Value,simx_opmode_oneshot); simxSetJointPosition(clientID,joint2Handle,joint2Value,simx_opmode_oneshot); simxSetJointPosition(clientID,joint3Handle,joint3Value,simx_opmode_oneshot); simxPauseCommunication(clientID,0); // Above's 3 joints will be received and set on the V-REP side at the same time 在 V-rep 端設定變數值: simSetIntegerSignal(\"mySignalName\",42) 之後, 可以從 client 端, 以 remote API streaming 模式取得該變數值: res,signalValue=simxGetIntegerSignal(clientId,\"mySignalName\", vrep.simx_opmode_streaming) 當然, 也可以反方向, 從 V-rep 端取得 client 端的變數值. 參考範例: # Make sure to have the server side running in V-REP: # in a child script of a V-REP scene, add following command # to be executed just once, at simulation start: # # simExtRemoteApiStart(19999) # # then start simulation, and run this program. # # IMPORTANT: for each successful call to simxStart, there # should be a corresponding call to simxFinish at the end! try: import vrep except: print '--------------------------------------------------------------' print '\"vrep.py\" could not be imported. This means very probably that' print 'either \"vrep.py\" or the remoteApi library could not be found.' print 'Make sure both are in the same folder as this file,' print 'or appropriately adjust the file \"vrep.py\"' print '--------------------------------------------------------------' print '' import time print ('Program started') vrep.simxFinish(-1) # just in case, close all opened connections clientID=vrep.simxStart('127.0.0.1',19999,True,True,5000,5) # Connect to V-REP if clientID!=-1: print ('Connected to remote API server') # Now try to retrieve data in a blocking fashion (i.e. a service call): res,objs=vrep.simxGetObjects(clientID,vrep.sim_handle_all,vrep.simx_opmode_oneshot_wait) if res==vrep.simx_return_ok: print ('Number of objects in the scene: ',len(objs)) else: print ('Remote API function call returned with error code: ',res) time.sleep(2) # Now retrieve streaming data (i.e. in a non-blocking fashion): startTime=time.time() vrep.simxGetIntegerParameter(clientID,vrep.sim_intparam_mouse_x,vrep.simx_opmode_streaming) # Initialize streaming while time.time()-startTime < 5: returnCode,data=vrep.simxGetIntegerParameter(clientID,vrep.sim_intparam_mouse_x,vrep.simx_opmode_streaming) # Try to retrieve the streamed data if returnCode==vrep.simx_return_ok: # After initialization of streaming, it will take a few ms before the first value arrives, so check the return code print ('Mouse position x: ',data) # Mouse position x is actualized when the cursor is over V-REP's window # Now send some data to V-REP in a non-blocking fashion: vrep.simxAddStatusbarMessage(clientID,'Hello V-REP!',vrep.simx_opmode_oneshot) # Before closing the connection to V-REP, make sure that the last command sent out had time to arrive. You can guarantee this with (for example): vrep.simxGetPingTime(clientID) # Now close the connection to V-REP: vrep.simxFinish(clientID) else: print ('Failed connecting to remote API server') print ('Program ended') V-rep Remote API 函式列表: http://www.coppeliarobotics.com/helpFiles/en/remoteApiFunctionListCategory.htm V-rep 的 remote API 是以 V-rep plugin (動態連結程式庫) 的方式完成, 程式專案位於 programming/v_repExtRemoteApi 目錄中. V-rep remote API 可以進一步在 embedded script 程式中利用 Lua 程式進行延伸: myFunctionName=function(inInts,inFloats,inStrings,inBuffer) -- inInts, inFloats and inStrings are tables -- inBuffer is a string -- Perform any type of operation here. -- Always return 3 tables and a string, e.g.: return {},{},{},'' end 然後利用下列外部的 Python 程式進行呼叫: inputInts=[1,2,3] inputFloats=[53.21,17.39] inputStrings=['Hello','world!'] inputBuffer=bytearray() inputBuffer.append(78) inputBuffer.append(42) res,retInts,retFloats,retStrings,retBuffer=vrep.simxCallScriptFunction(clientID,'objectName',vrep.sim_scripttype_childscript, 'myFunctionName',inputInts,inputFloats,inputStrings,inputBuffer,vrep.simx_opmode_blocking) if res==vrep.simx_return_ok: print (retInts) print (retFloats) print (retStrings) print (retBuffer) 以 remote API 取 camera 影像 from PIL import Image import array res, v0 = vrep.simxGetObjectHandle(clientID,'NAO_vision1',vrep.simx_opmode_oneshot_wait) res, resolution, image = vrep.simxGetVisionSensorImage(clientID,v0,0,vrep.simx_opmode_streaming) image_byte_array = array.array('b',image) # image resolution is 256x144 im = Image.frombuffer(\"RGB\", (256,144), image_byte_array, \"raw\", \"RGB\", 0, 1) im.show() 取影片: import vrep,time,sys import matplotlib.pyplot as plt from PIL import Image import array def streamVisionSensor(visionSensorName,clientID,pause=0.0001): #Get the handle of the vision sensor res1,visionSensorHandle=vrep.simxGetObjectHandle(clientID,visionSensorName,vrep.simx_opmode_oneshot_wait) print(visionSensorHandle) #Get the image res2,resolution,image=vrep.simxGetVisionSensorImage(clientID,visionSensorHandle,0,vrep.simx_opmode_streaming) print(res2, res1) #Allow the display to be refreshed plt.ion() #Initialiazation of the figure time.sleep(0.5) res,resolution,image=vrep.simxGetVisionSensorImage(clientID,visionSensorHandle,0,vrep.simx_opmode_buffer) im = Image.new(\"RGB\", (resolution[0], resolution[1]), \"white\") #Give a title to the figure fig = plt.figure(1) fig.canvas.set_window_title(visionSensorName) #inverse the picture plotimg = plt.imshow(im,origin='lower') #Let some time to Vrep in order to let him send the first image, otherwise the loop will start with an empty image and will crash time.sleep(1) while (vrep.simxGetConnectionId(clientID)!=-1): #Get the image of the vision sensor res,resolution,image=vrep.simxGetVisionSensorImage(clientID,visionSensorHandle,0,vrep.simx_opmode_buffer) #Transform the image so it can be displayed using pyplot image_byte_array = array.array('b',image) im = Image.frombuffer(\"RGB\", (resolution[0],resolution[1]), image_byte_array, \"raw\", \"RGB\", 0, 1) #Update the image plotimg.set_data(im) #Refresh the display plt.draw() #The mandatory pause ! (or it'll not work) plt.pause(pause) print('End of Simulation') if __name__ == '__main__': vrep.simxFinish(-1) clientID=vrep.simxStart('127.0.0.2',19999,True,True,5000,5) if clientID!=-1: print('Connected to remote API server') streamVisionSensor('NAO_vision1',clientID,0.0001) else: print('Connection non successful') sys.exit('Could not connect') Execute Complex Commands # This example illustrates how to execute complex commands from # a remote API client. You can also use a similar construct for # commands that are not directly supported by the remote API. # # Load the demo scene 'remoteApiCommandServerExample.ttt' in V-REP, then # start the simulation and run this program. # # IMPORTANT: for each successful call to simxStart, there # should be a corresponding call to simxFinish at the end! # # When running Python 3.x, add a 'b' prefix to strings, e.g.: # 'hello world' becomes b'hello world' def getCmdString(id,cnt,data): l=12+len(data) retData=vrep.simxPackInts([id,cnt,l]) return retData+data def waitForCmdReply(cnt): while True: result,string=vrep.simxReadStringStream(clientID,'repliesToRemoteApiClient',vrep.simx_opmode_streaming) if result==vrep.simx_return_ok: while len(string)!=0: headerPacked=string[0:12] header=vrep.simxUnpackInts(headerPacked) if cnt==header[1]: replyData='' if header[2]>12: replyData=string[12:header[2]] return replyData string=string[header[2]:len(string)] try: import vrep except: print ('--------------------------------------------------------------') print ('\"vrep.py\" could not be imported. This means very probably that') print ('either \"vrep.py\" or the remoteApi library could not be found.') print ('Make sure both are in the same folder as this file,') print ('or appropriately adjust the file \"vrep.py\"') print ('--------------------------------------------------------------') print ('') import ctypes print ('Program started') vrep.simxFinish(-1) # just in case, close all opened connections clientID=vrep.simxStart('127.0.0.1',19999,True,True,5000,5) # Connect to V-REP if clientID!=-1: print ('Connected to remote API server') # Commands are send via the string signal 'commandsFromRemoteApiClient'. # Commands are simply appended to that string signal # Each command is coded in following way: # 1. Command ID (integer, 4 chars) # 2. Command counter (integer, 4 chars). Simply start with 0 and increment for each command you send # 3. Command length (integer, includes the command ID, the command counter, the command length, and the additional data (i.e. command data)) # 4. Command data (chars, can be of any length, depending on the command) # # Replies are coded in a same way. An executed command should reply with the same command counter. # # Above simple protocol is just an example: you could use your own protocol! (but it has to be the same on the V-REP side) # 1. First send a command to display a specific message in a dialog box: cmdID=1 # this command id means: 'display a text in a message box' cmdCnt=0 cmdData='Hello world!' stringToSend=getCmdString(cmdID,cmdCnt,cmdData) raw_ubytes = (ctypes.c_ubyte * len(stringToSend)).from_buffer_copy(stringToSend) vrep.simxWriteStringStream(clientID,'commandsFromRemoteApiClient',raw_ubytes,vrep.simx_opmode_oneshot) print ('Return string: ',waitForCmdReply(cmdCnt)) # display the reply from V-REP (in this case, just a string) # 2. Now create a dummy object at coordinate 0.1,0.2,0.3: cmdID=2 # this command id means: 'create a dummy at a specific coordinate with a specific name' cmdCnt=cmdCnt+1 cmdData='MyDummyName'+vrep.simxPackFloats([0.1,0.2,0.3]) stringToSend=getCmdString(cmdID,cmdCnt,cmdData) raw_ubytes = (ctypes.c_ubyte * len(stringToSend)).from_buffer_copy(stringToSend) vrep.simxWriteStringStream(clientID,'commandsFromRemoteApiClient',raw_ubytes,vrep.simx_opmode_oneshot) replyData=waitForCmdReply(cmdCnt) print ('Dummy handle: ',vrep.simxUnpackInts(replyData)[0]) # display the reply from V-REP (in this case, the handle of the created dummy) # Now close the connection to V-REP: vrep.simxFinish(clientID) else: print ('Failed connecting to remote API server') print ('Program ended') 與上述 Client 端程式配合的 V-rep non-threaded child 程式碼: if (sim_call_type==sim_childscriptcall_initialization) then simExtRemoteApiStart(19999) end if (sim_call_type==sim_childscriptcall_actuation) then local commands=simGetStringSignal('commandsFromRemoteApiClient') -- Read commands sent from a remote API client if commands then simClearStringSignal('commandsFromRemoteApiClient') -- Clear the signal -- Process the commands in following loop: while #commands>0 do local cmdID=simUnpackInts(commands,0,1)[1] local cmdCounter=simUnpackInts(commands,1,1)[1] local cmdLength=simUnpackInts(commands,2,1)[1] local cmdData='' if cmdLength>12 then cmdData=string.sub(commands,13,13+cmdLength-12) end commands=string.sub(commands,cmdLength+1) -- this contains the next commands -- Now process the command, and prepare a reply string signal: local reply='' if cmdID==1 then -- We have to process the command with ID 1, in this example, simply display a dialog box that prints the text stored in cmdData: simDisplayDialog('Message from the remote API client',cmdData,sim_dlgstyle_ok,false) reply='message was displayed' end if cmdID==2 then -- We have to process the command with ID 2, in this example, create a dummy object at coordinates specified in cmdData: local dummyHandle=simCreateDummy(0.05) local dummyNameSize=#cmdData-12 -- cmdData should contain the dummy name, plus the x/y/z coordinates local position=simUnpackFloats(cmdData,0,0,dummyNameSize) if dummyNameSize>0 then local errorReportMode=simGetIntegerParameter(sim_intparam_error_report_mode) simSetIntegerParameter(sim_intparam_error_report_mode,0) -- temporarily suppress error output (because we are not allowed to have two times the same object name) simSetObjectName(dummyHandle,string.sub(cmdData,1,dummyNameSize)) simSetIntegerParameter(sim_intparam_error_report_mode,errorReportMode) -- restore the original error report mode end simSetObjectPosition(dummyHandle,-1,position) reply=simPackInts({dummyHandle}) end if cmdID==3 then -- You can add as many commands as needed end -- Now, before setting up the reply string, append the cmdID, and a reply length: local replyLength=12+#reply local replyFromOtherCommands=simGetStringSignal('repliesToRemoteApiClient') if not replyFromOtherCommands then replyFromOtherCommands='' end local totalReplySignal=replyFromOtherCommands..simPackInts({cmdID})..simPackInts({cmdCounter})..simPackInts({replyLength})..reply simSetStringSignal('repliesToRemoteApiClient',totalReplySignal) -- update the reply signal end end end Qt based custom UIs http://www.coppeliarobotics.com/helpFiles/en/customUIPlugin.htm V-rep Tutorials: http://www.coppeliarobotics.com/helpFiles/en/bubbleRobTutorial.htm http://www.coppeliarobotics.com/helpFiles/en/buildingAModelTutorial.htm http://www.coppeliarobotics.com/helpFiles/en/lineFollowingBubbleRobTutorial.htm Inverse Kinematics Tutorial http://www.coppeliarobotics.com/helpFiles/en/inverseKinematicsTutorial.htm http://www.coppeliarobotics.com/helpFiles/en/hexapodTutorial.htm http://www.coppeliarobotics.com/helpFiles/en/externalControllerTutorial.htm http://www.coppeliarobotics.com/helpFiles/en/pluginTutorial.htm http://www.coppeliarobotics.com/helpFiles/en/conveyorBeltTutorial.htm Compiling V-rep http://www.coppeliarobotics.com/helpFiles/en/compilingVrep.htm V-rep Other Interfaces http://www.coppeliarobotics.com/helpFiles/en/otherInterfaces.htm Extra contributions: http://www.coppeliarobotics.com/contributions/ V-rep Forum http://www.forum.coppeliarobotics.com/"},{"url":"./brython-editor.html","title":"網際 Brython 程式執行環境","tags":"Course","text":"Brython 程式環境可以用來練習許多 Python3 的簡單語法, 也可以納入 Javascript 程式庫, 利用 Ajax 模式結合網際瀏覽器與伺服器上的資源解決協同產品設計流程上的問題. window.onload=function(){ brython(1); } 列出 2017 Spring 協同產品設計實習課程日期之 Python 程式碼如下: from browser import document, html import calendar import locale cal2 = document[\"cal2\"] def getClassdate(year=2017, startM=2, startD=20, w=0, note=\"\"): # w=0 表示課程排在星期一 # startM 表示開學月份, startD 表示開學日 # note 為課程初始告示 # default calendar MONDAY is the first day of the week # 每學期共有 18 週 totalW = 18 count = 0 # output = \"2017 Spring 2bCD (三) 08:10-12:00 各週上課日期: \" output = note + html.BR() # 若必須全年搜尋則 7 改為 12, 但是因為只有 18 週, 因此邏輯要修改讓程式較快結束 for month in range(startM, 7): monthArray = calendar.monthcalendar(2017, month) for week in range(len(monthArray)): weekArray = monthArray[week] # 只需要列出星期 (w+1) if weekArray[w] != 0: if month == startM: if weekArray[startM] > startD: count += 1 if count <= totalW: if month == 3 and weekArray[w] == 31: output += \"w\"+str(count)+\"-\"+ str(month)+ \"/\" + str(weekArray[w]) + \"(放假), \" else: output += \"w\"+str(count)+\"-\"+ str(month)+ \"/\" + str(weekArray[w]) + \", \" else: count += 1 if count <= totalW: if month == 3 and weekArray[w] == 31: output += \"w\"+str(count)+\"-\"+ str(month)+ \"/\" + str(weekArray[w]) + \"(放假), \" else: output += \"w\"+str(count)+\"-\"+ str(month)+ \"/\" + str(weekArray[w]) + \", \" cal2 <= output # 2b 協同產品設計實習 (三 w=2) getClassdate(year=2017, startM=2, startD=20, w=2, note=\"2017 Spring 2bCD (三) 08:10-12:00 各週上課日期: \") cal2 <= html.BR() + html.BR() # 2a 協同產品設計實習 (四 w=3) getClassdate(year=2017, startM=2, startD=20, w=3, note=\"2017 Spring 2aCD (四) 08:10-12:00 各週上課日期: \") cal2 <= html.BR() + html.BR() # 1a 網際內容管理 (五 w=4) getClassdate(year=2017, startM=2, startD=20, w=4, note=\"2017 Spring 1aWCM (五) 13:20-16:10 各週上課日期: \") cal2 <= html.BR() + html.BR() # VE1a 網際內容管理 (五 w=4) getClassdate(year=2017, startM=2, startD=20, w=4, note=\"2017 Spring VE1aCP (五) 18:30-20:00 各週上課日期: \") cal2 <= html.BR() + html.BR() 利用伺服器執行 Python3 程式 Jupyterhub: https://8888.kmol.info:9443 利用以下的編輯器執行 Python3 程式 在 Firefox 中, 以 Preferences - General - Downloads 選擇\"Always ask me where to save files\" 在 Chrome 中, 以 Settings - Advanced - Downloads 選擇 Ask where to save each file before downloading function doSave(){ var blob = new Blob([localStorage[\"py_src\"]], {type: \"text/plain;charset=utf-8\"}); filename = document.getElementById('filename').value saveAs(blob, filename+\".py\"); } import sys import time import traceback import javascript from browser import document as doc, window, alert has_ace = True try: editor = window.ace.edit(\"editor\") session = editor.getSession() session.setMode(\"ace/mode/python\") editor.setOptions({ 'enableLiveAutocompletion': True, 'enableSnippets': True, 'highlightActiveLine': False, 'highlightSelectedWord': True }) except: from browser import html editor = html.TEXTAREA(rows=20, cols=70) doc[\"editor\"] <= editor def get_value(): return editor.value def set_value(x):editor.value = x editor.getValue = get_value editor.setValue = set_value has_ace = False if hasattr(window, 'localStorage'): from browser.local_storage import storage else: storage = None def reset_src(): if storage is not None and \"py_src\" in storage: editor.setValue(storage[\"py_src\"]) else: editor.setValue('for i in range(10):\\n\\tprint(i)') editor.scrollToRow(0) editor.gotoLine(0) def reset_src_area(): if storage and \"py_src\" in storage: editor.value = storage[\"py_src\"] else: editor.value = 'for i in range(10):\\n\\tprint(i)' class cOutput: def __init__(self,target): self.target = doc[target] def write(self,data): self.target.value += str(data) #if \"console\" in doc: sys.stdout = cOutput(\"console\") sys.stderr = cOutput(\"console\") def to_str(xx): return str(xx) info = sys.implementation.version doc['version'].text = 'Brython %s.%s.%s' % (info.major, info.minor, info.micro) output = '' def show_console(ev): doc[\"console\"].value = output doc[\"console\"].cols = 60 doc[\"console\"].rows = 10 # load a Python script def load_script(evt): _name = evt.target.value + '?foo=%s' % time.time() editor.setValue(open(_name).read()) # run a script, in global namespace if in_globals is True def run(*args): global output doc[\"console\"].value = '' src = editor.getValue() if storage is not None: storage[\"py_src\"] = src t0 = time.perf_counter() try: #ns = {'__name__':'__main__'} ns = {'__name__':'editor'} exec(src, ns) state = 1 except Exception as exc: traceback.print_exc(file=sys.stderr) state = 0 output = doc[\"console\"].value print('<completed in %6.2f ms>' % ((time.perf_counter() - t0) * 1000.0)) return state if has_ace: reset_src() else: reset_src_area() def clear_console(ev): doc[\"console\"].value = \"\" doc['run'].bind('click',run) doc['show_console'].bind('click',show_console) doc['clear_console'].bind('click',clear_console) Filename: .py Run Output 清除 from browser import document as doc import script1 def ex1(ev): script1.editor.setValue('''#ex1 簡單的 for 迴圈範例 for i in range(10): print(i) ''') script1.editor.scrollToRow(0) script1.editor.gotoLine(0) doc['ex1'].bind('click',ex1) ex1 -for 迴圈 from browser import document as doc import script1 def ex2(ev): script1.editor.setValue('''#溫度轉換程式 from browser import document as doc # 因為此函式與滑鼠互動, 需要 event 當作輸入 def convTemp(): mystring = \"\" cdegree = input(\"請輸入攝氏溫度:\") fdegree = float(cdegree)*9/5 + 32 output_string = \"攝氏 \" + str(cdegree) + \"度=華氏 \" + str(fdegree) + \"度\" # 利用 print() 將轉換結果送到 console 區 print(output_string) #直接呼叫 convTemp() 執行 convTemp() ''') script1.editor.scrollToRow(0) script1.editor.gotoLine(0) doc['ex2'].bind('click',ex2) ex2 -溫度換算 from browser import document import script1 def get_file(e): data = open(\"./../python_ex/for1.py\").read() script1.editor.setValue(data) script1.editor.scrollToRow(0) script1.editor.gotoLine(0) document[\"get\"].bind(\"click\", get_file) from browser import document import script1 def get_temp1(e): data = open(\"./../python_ex/temp1.py\").read() script1.editor.setValue(data) script1.editor.scrollToRow(0) script1.editor.gotoLine(0) document[\"get_temp1\"].bind(\"click\", get_temp1) from browser import document import script1 def get_ver_and_kw(e): data = open(\"./../python_ex/ver_and_kw.py\").read() script1.editor.setValue(data) script1.editor.scrollToRow(0) script1.editor.gotoLine(0) document[\"get_ver_and_kw\"].bind(\"click\", get_ver_and_kw) for1.py temp1.py ver_and_kw.py"},{"url":"./2017spring-cd.html","title":"2017Spring 協同產品設計實習","tags":"Course","text":"協同產品設計實習在銜接計算機程式、電腦輔助設計實習課程, 讓學員以分組協同的方式進行產品設計實習. 歷年協同產品設計實習課程 2016 Spring 協同產品設計實習 2015 Spring 協同產品設計實習 2014 Spring 協同產品設計實習 協同產品設計實習課程規劃 分組規劃: 每班自選組員, 分為 8 組, 每四組分配一台 8GB Ram/500GB HD 電腦作為廣域網路伺服器. 各組成員必須利用自建網站與 Github Pages 進行協同歷程簡報、網誌與操作流程影片 (分別放在 Youtube 與 Vimeo , 並冠上學員學號、系所名稱與課程名稱) 展示. 協同實習專案: (一) 多連桿機構 由 Solvespace 與 Onshape 完成組立後, (二) 以程式套件取得特定點的迴轉軌跡後, (三) 利用各組自行編寫的 Python3 + C 程式進行軌跡點座標進行驗證. (四) 之後將各連桿機構 (包括單桿、四連桿與多連桿單一自由度系統) 轉入 V-rep 進行驅動模擬後, (五) 轉由 remote API 模式, 以區域網路或廣域網路之 Python3 程式進行 V-rep 連桿機構之驅動模擬控制. 確定可以利用各連桿尺寸調控目標端點的迴轉路徑後, (六) 接著在 Onshape 中, 以協同模式完成多連桿機構的細部組立設計後, (七) 再根據多連桿機構的設計材料表, 進行備料, 此階段並導入 Arduino 直流馬達控制系統, 並以 Delta 3D Printer 印出多連桿系統的實體零件後, 進行多連桿機構系統的實體組立與運動控制. (八) 最後, 每四組各自利用所完成的 多連桿機構 , 組成一四足行走機構, 在 V-rep 中完成運動模擬後, 每班所完成的兩具行走機構, 分別在 V-rep 虛擬環境與實體環境中進行運動模擬與行走測試. 協同產品設計實習評分標準: (一) 各參與協同學員是否按步就班利用網際簡報、網誌與操作影片呈現細節內容 (50%) - 各組學員根據實際完成內容自評成績後 * 老師認可百分比 (二) 各組學員在產品設計實習過程是否互助砥礪完成既定工作任務 (分組成員互評) (20%) - 各組學員根據實際內容舉證互評成績平均, 參考系統: https://pygroup-ag100.rhcloud.com (三) 上課出席與表現 (各學員根據實際內容舉證自評成績 * 老師認可百分比) (30%) 協同產品設計實習各週上課日期 2017 Spring 08:10-12:00 各週上課日期: w1 -2/22 2b (三) & 2/23 2a (四) - 請每人準備一個隨身碟, 下載 可攜程式系統 (1GB). 接著請 下載 Onshape_help.pdf (17.2 MB), 了解如何利用 Solvespace 與 Onshape 組立單軸旋轉連桿系統、四連桿系統與 多連桿系統 . w2 -3/1 2b (三) & 3/2 2a (四) - 每班分為八組, 每四組分配一台 8GB Ram/500GB HD 電腦作為 IPv4/IPv6 伺服器, 了解如何利用 IPv4 與 IPv6 網路連線傳輸設計檔案. 各組 CMSimfly 區域網站的應用. 各組以協同模式完成 Solvespace 與 Onshape 單軸旋轉連桿系統與四連桿系統. w3 -3/8 2b (三) & 3/9 2a (四) - 各組以協同模式完成 Solvespace 與 Onshape 之 多連桿系統 組立. 各組完成廣域網路與 Github Pages 網頁與簡報呈現各組學員與分組協同工作流程細節. w4 -3/15 2b (三) & 3/14 2a (四) - 單連桿與四連桿機構轉入 V-rep 進行運動模擬 單連桿 w5 -3/22 2b (三) & 3/23 2a (四) - 單連桿與四連桿機構轉入 V-rep 進行運動模擬 w6 -3/29 2b (三) & 3/30 2a (四) - 多連桿機構轉入 V-rep 進行運動模擬 多連桿 w7 -4/5 2b (三) & 4/6 2a (四) - 多連桿機構轉入 V-rep 進行運動模擬 w8 -4/12 2b (三) & 4/13 2a (四) - 各組期中簡報 (含影片拍攝與上傳) 與評分 w9 -4/19 2b (三) & 4/20 2a (四) - V-rep remote API 運動控制 w10 -4/26 2b (三) & 4/27 2a (四) - V-rep remote API 運動控制 w11 -5/3 2b (三) & 5/4 2a (四) - Arduino 直流馬達控制 w12 -5/10 2b (三) & 5/11 2a (四) - Arduino 直流馬達控制 w13 -5/17 2b (三) & 5/18 2a (四) - Onshape 行走機構細部設計 (含齒輪傳動) w14 -5/24 2b (三) & 5/25 2a (四) - Onshape 行走機構細部設計 (含齒輪傳動) w15 -5/31 2b (三) & 6/1 2a (四) - V-rep 行走機構模擬與零件列印組立測試 w16 -6/7 2b (三) & 6/8 2a (四) - V-rep 行走機構模擬與零件列印組立測試 w17 -6/14 2b (三) & 6/15 2a (四) - V-rep 行走機構模擬與零件列印組立測試 w18 -6/21 2b (三) & 6/22 2a (四) - 各組期末簡報 (含影片拍攝與上傳) 與評分 參考資料: 機械設計工程系-協同產品設計實習課程: cd v-rep 8bar simulation from 虎尾科大機械設計工程 on Vimeo . https://github.com/spacether/pycalculix"}]};