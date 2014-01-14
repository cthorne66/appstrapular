##appstrapular

A quick start for a JS application, which includes testing &amp; building operations


###Key technologies
	* Backbone 			Client-side MV* framework
	* RequireJS			Dependency management & async loading
	* Underscore		General utilities & templating
	* jQuery			DOM manipulation & animations
	* Bootstrap			Front-end framework for CSS on UI component standardization 
	* Grunt				Workflow operations
	* Jasmine			Unit testing


###Goals
	* code quality checks
	* code beautification process
	* code documentation process
	* performance engineering
	* bi-directional data binding
	* unit testing
	* pre-compilation of templates


###Instructions

	1. Clone this repository to your desired directory, referred to as the "webapp" dir from here out
	2. cd into the webapp directory
	3. Run 'npm install -g grunt-cli' from the command line to install grunt globally
	4. Run 'npm install -g scaffolt' from the command line to install scaffolt globally (for code generation)
	5. Run `npm install` from the command line to install remaining local dependencies

	Optional
	* If you want to use the options to generate full-project documentation from the JSDoc in your src code, you will need to install Pygments, which is a dependency of grunt-docker used in this project.  Instructions can be found here: [http://pygments.org/download/]

###Workflows from command line

	`grunt`
		This will show you the options available

	`grunt validate`
		This will execute the following
			* Format applicable source files (within src folder) that don't match the formatting standards.  This will not affect external libs
			* Run JSHint against the src files.  Results are outputted to hintresults.xml
			* To come:
				- Unit tests
				- Auto documentation from JSDoc
			If anything fails in this build task, it is meant to break/stop.  These items must be resolved!

			**If you run this from a windows machine, you will probably have to set environment variables for browser paths.  For example:
				CHROME_BIN='C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
				IE_BIN='C:\Program Files (x86)\Internet Explorer\iexplore.exe'
				FIREFOX_BIN='C:\Program Files (x86)\Mozilla Firefox\firefox.exe'

				More info can be found here: [http://karma-runner.github.io/0.8/config/browsers.html]

	`grunt document`
		This will generate documentation for the src code.  After this command has been ran, you can point your browser to webapp/doc/src/index.html.html to see it
	
	`grunt optimize`
		This will create modules, minify and compress files, and place them into the "target" directory.  You can use the contents of this folder to your webserver for environments where you want better page performance (aka QA/Prod servers)
		
	`scaffolt ModelView <name>`
		This is create a new view with template and model with the <name> specified, in the corresponding directories under src/js

	`scaffolt ModelViewCollection <name>`
		This is create a new view with template, model, collection with the <name> specified, in the corresponding directories under src/js