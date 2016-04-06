<?php 
require_once("data/mysql.php");
?>

<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Kennzeichen Finder</title>
        
        <!-- Bootstrap -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>

    <body>
    	<div class="container">
        
        <div class="row">
			<div class="col-md-12">
            
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">Kennzeichen Finder</a>
                    </div>
                    <div id="navbar" class="navbar-collapse collapse">
                        <ul class="nav navbar-nav">
							<li><a href="#">Interaktionen</a></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right authenticated">
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">User <span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li role="separator" class="divider"></li>
                                    <li class="dropdown-header">Nav header</li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="javascript:doLogout()">Ausloggen</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div><!--/.nav-collapse -->
                </div><!--/.container-fluid -->
            </nav>
      
				</div>
			</div>
        
        	<div class="row">
				<div class="col-md-12">
                	
                </div>
            </div>
            
        	<div class="row">
				<div class="col-md-12" id="plateOuter">
            		<input type="text" id="plate" class="form-control" placeholder="B" onKeyUp="checkPlate()"> <!--this.value-->
            	</div>
            </div>
            
        	<div class="row standardBox">
				<div class="col-sm-12 col-md-6" id="result">
                	Starten Sie Ihre Suche
            	</div>
				<div class="col-sm-12 col-md-6">
                	<div id="map">
            		</div>
                </div>
            </div>
            
        	<div class="row standardBox">
            	<div class="notauthenticated">
					<div class="col-xs-2" onClick="showLoginDialog()">
            			<div class="loginButton">
                			Einloggen
                		</div>
                    </div>
					<div class="col-xs-2" onClick="showRegisterDialog()">
            			<div class="loginButton">
                			Registrieren
                		</div>
                    </div>
                </div>
            	<div class="authenticated">
                    <div class="col-sm-12">
                        <textarea>Kommentar eingeben ...</textarea>
                    </div>
                </div>
				<div class="col-sm-12 col-md-6" id="comments">
                </div>
            </div>
            
    	</div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="loginDialog" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Einloggen</h4>
                    </div>
                    <div class="modal-body">
                        <p>
                            <label>Nutzername:</label>
                            <input type="text"  name="username" />
                        </p>
                        <p>
                            <label>Passwort:</label>
                            <input type="password" name="password" />
                        </p>
                        <p>
                            <input type="checkbox" name="remember_me" value="1" />	
                            <label><small>Eingeloggt bleiben</small></label>
                        </p>      
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="newfeedform" onClick="doLogin()">Einloggen</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Abbrechen</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        
        <div class="modal fade" tabindex="-1" role="dialog" id="logoutSuccess" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Ausgeloggt</h4>
                    </div>
                    <div class="modal-body">
                        <p>
                            Sie haben sich erfolgreich ausgeloggt!
                        </p>      
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">OK</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        
        <div class="modal fade" tabindex="-1" role="dialog" id="registerDialog" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Registrieren</h4>
                    </div>
                    <div class="modal-body">
                    	<div id="registerError">
                        </div>
                        <div class="registerForm">
                            <p>
                                <label>Nutzername:</label>
                                <input type="text" name="reg_username" />
                            </p>
                            
                            <p>
                                <label>Passwort:</label>
                                <input type="password" name="reg_password" />
                            </p>
                            
                            <p>
                                <label>Passwort wiederholen:</label>
                                <input type="password" name="reg_passwordc" />
                            </p>
                            
                            <p>
                                <label>E-Mail:</label>
                                <input type="email" name="reg_email" />
                            </p>    
                        </div>
                        <div class="registerDone">
                        	<p>
                        		Sie haben sich erfolgreich registriert und können sich nun einloggen!
                            </p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="registerForm">
                            <button type="button" class="btn btn-primary" id="newfeedform" onClick="doRegister()">Registrieren</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Abbrechen</button>
                        </div>
                        <div class="registerDone">
                        	<button type="button" class="btn btn-default" data-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        
        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="js/jquery.min.js"></script>
    
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="js/bootstrap.min.js"></script>
        
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBeaL0cr-RyGcEASkTnjCgYROXxi38cAf4&signed_in=true&callback=initMap"
        async defer></script>
        
        <script src="js/kennzeichen_finder.js"></script>
        
    </body>
</html>