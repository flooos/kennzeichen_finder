<?php 
require_once("UserPie/models/config.php");
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
            
            <!--Navigation-->
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
                        <ul class="nav navbar-nav authenticated">
							<li><a href="javascript:getProtocol()">Aktivitätsprotokoll</a></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right notauthenticated">
							<li><a href="javascript:showRegisterDialog()">Registrieren</a></li>
							<li><a href="javascript:showLoginDialog()">Anmelden</a></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right authenticated">
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="username">User</span> <span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li><a href="javascript:doLogout()">Abmelden</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
      
				</div>
			</div>
        
        	<div class="row">
				<div class="col-md-12">
                	
                </div>
            </div>
            
            <!--Eingabefled Nummernschild-->
        	<div class="row">
				<div class="col-md-12" id="plateOuter">
            		<input type="text" id="plate" class="form-control" placeholder="B" onKeyUp="checkPlate()"> <!--this.value-->
            	</div>
            </div>
            
            <!--Hinweistext default-->
            <div class="row standardBox defaultRow">
				<div class="col-sm-12 col-md-12">
                	Geben Sie ein Kennzeichenkürzel ein, um die Suche zu starten.
            	</div>
            </div>
            
            <!--Ergebnisbox-->
        	<div class="row standardBox resultRow">
            	<!--Leeres Div für Ergebnis-->
				<div class="col-sm-12 col-md-6" id="result">
            	</div>
				<div class="col-sm-12 col-md-6">
                	<!--Leeres Div für Google Maps Karte-->
                	<div id="map"></div>
                </div>
            </div>
            
            <!--Kommentarbox-->
        	<div class="row standardBox commentRow">
                <!--Anzeigen, wenn eingeloggt-->
                <div class="authenticated">
                    <div class="col-sm-12 commentBoxArea">
                        <div class="left">
                            <img src="img/user.svg" alt="User" class="img-circle userImage">
                        </div>
                        <div class="left CommentFullWidth">
                        <form action="javascript:" method="post">
                            <textarea name="comment" class="form-control" id="commentArea" onClick="emptyCommentField(this.value)">Kommentar eingeben ...</textarea>
                            <div class="selectedCommentArea">
                                <input type="submit" class="btn btn-default" value="Speichern" onClick="saveComment()" />
                            </div>
                        </form>
                        </div>
                        <div class="clear">
                        </div>
                    </div>
                </div>
                <!--Anzeigen, wenn nicht angemeldet-->
                <div class="bg-warning loginInfo notauthenticated">
                	Melden Sie sich an, um Kommentare zu schreiben.
                </div>
                <!--Leeres Div für Kommentare-->
                <div class="col-xs-12 col-md-12" id="comments">
                </div>
                <div class="clear">
                </div>
            </div>
            
    	</div>
        
        <!--Anmelde Diaglog-->
        <div class="modal fade" tabindex="-1" role="dialog" id="loginDialog" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Anmelden</h4>
                    </div>
                    <form onSubmit="doLogin(); return false" method="post">
                        <div class="modal-body">
                        	<!--Leeres Div für Error-Meldungen-->
                            <div id="loginError">
                            </div>
                            <div class="row">
                                <div class="col-xs-2">
                                    <div class="formLable">
                                        Nutzername
                                    </div>
                                    <div class="formLable">
                                        Passwort
                                    </div>
                                </div>
                                <div class="col-xs-10">
                                    <div class="formInput">
                                        <input type="text" class="form-control" name="username" />
                                    </div>
                                    <div class="formInput">
                                        <input type="password" class="form-control" name="password" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <input type="submit" class="btn btn-primary" id="newfeedform" value="Anmelden" />
                            <button type="button" class="btn btn-default" data-dismiss="modal">Abbrechen</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
        <!--Abmeldeinfo Dialog-->
        <div class="modal fade" tabindex="-1" role="dialog" id="logoutSuccessDialog" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Abgemeldet</h4>
                    </div>
                    <div class="modal-body">
                        <p>
                            Sie haben sich erfolgreich abgemeldet!
                        </p>      
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!--Kommentar bearbeiten Dialog-->
        <div class="modal fade" tabindex="-1" role="dialog" id="editComment" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Kommentar bearbeiten</h4>
                    </div>
                    <form onSubmit="saveEditComment(); return false" method="post">
                        <div class="modal-body">
                            <textarea name="editComment" class="form-control" id="editCommentArea"></textarea>
                            <input type="hidden" name="commentId" />
                        </div>
                        <div class="modal-footer">
                            <input type="submit" class="btn btn-primary" id="newfeedform" value="Speichern" />
                            <button type="button" class="btn btn-default" data-dismiss="modal" onClick="getProtocol()">Abbrechen</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
        <!--Registrieren Dialog-->
        <div class="modal fade" tabindex="-1" role="dialog" id="registerDialog" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Registrieren</h4>
                    </div>
                    <form onSubmit="doRegister(); return false" method="post">
                        <div class="modal-body">
                        	<!--Leeres Div für Error-Meldungen-->
                            <div id="registerError">
                            </div>
                            <!--Registrier-Div standardgemäß eingeblendet-->
                            <div class="registerForm">
                                <div class="row">
                                    <div class="col-xs-5 col-sm-3">
                                    	<div class="formLable">
                                        	Nutzername
                                        </div>
                                    	<div class="formLable">
                                        	Passwort
                                        </div>
                                    	<div class="formLable">
                                        	Passwort wdh
                                        </div>
                                    	<div class="formLable">
                                        	E-Mail
                                        </div>
                                    </div>
                                    <div class="col-xs-7 col-sm-9">
                                   		<div class="formInput">
                                    		<input type="text" class="form-control" name="reg_username" />
                                        </div>
                                   		<div class="formInput">
                                			<input type="password" class="form-control" name="reg_password" />
                                        </div>
                                   		<div class="formInput">
                                			<input type="password" class="form-control" name="reg_passwordc" />
                                        </div>
                                   		<div class="formInput">
                                			<input type="email" class="form-control" name="reg_email" />
                                        </div>
                                    </div>
                                </div> 
                            </div>
                            <!--Erfolgsnachricht-Div standardgemäß ausgeblendet-->
                            <div class="registerDone">
                                <p>
                                    Sie haben sich erfolgreich registriert und können sich nun anmelden!
                                </p>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="registerForm">
                                <input type="submit" class="btn btn-primary" id="newfeedform" value="Registrieren" />
                                <button type="button" class="btn btn-default" data-dismiss="modal">Abbrechen</button>
                            </div>
                            <div class="registerDone">
                                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick="switchToLogin()">Zur Anmeldung</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal">OK</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
        <!--Aktivitätsprotokoll Dialog-->
        <div class="modal fade" tabindex="-1" role="dialog" id="protocolDialog" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Aktivitätsprotokoll</h4>
                    </div>
                    <div class="modal-body">
                    <ul class="nav nav-tabs">
                    	<li role="presentation" id="navProtocolComments" onClick="protocolSwitchTo('comments')" class="active"><a href="#">Kommentare</a></li>
                        <li role="presentation" id="navProtocolLikes" onClick="protocolSwitchTo('likes')"><a href="#">Gefällt mir-Angaben</a></li>
                    </ul>
                    	<!--Kommentar-Div standardgemäß eingeblendet-->
                        <div id="protocolComments">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Datum</th>
                                        <th>Ort</th>
                                        <th>Kommentar</th>
                                        <th>Optionen</th>
                                    </tr>
                                </thead>
                                <tbody id="protocolData">
                                </tbody>
                            </table>  
                        </div>
                        <!--Like-Div standardgemäß ausgeblendet-->
                        <div id="protocolLikes">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Datum</th>
                                        <th>Ort</th>
                                        <th>Landkreis</th>
                                        <th>Optionen</th>
                                    </tr>
                                </thead>
                                <tbody id="protocolDataLikes">
                                </tbody>
                            </table>  
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Schließen</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        
        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="js/jquery.min.js"></script>
    
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="js/bootstrap.min.js"></script>
        
        <!--Google Maps Einbindung-->
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBeaL0cr-RyGcEASkTnjCgYROXxi38cAf4&signed_in=false&callback=initMap"
        async defer></script>
        
        <!--Lokale js-Datei -->
        <script src="js/kennzeichen_finder.js"></script>
        
    </body>
</html>