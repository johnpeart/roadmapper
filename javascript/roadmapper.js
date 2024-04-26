function readCSVFile(){
	
    var files = document.querySelector('#importFile').files;

    if(files.length > 0 ){

        // Selected file
        var file = files[0];

        // FileReader Object
        var reader = new FileReader();

        // Read file as string 
        reader.readAsText(file);

        // Load event
        reader.onload = function(event) {

            // Read file data
            var csvdata = event.target.result;

            // Split by line break to gets rows Array
            var rowData = csvdata.split('\n');
			
			// Get the roadmap div
			var roadmap = document.getElementById('roadmap');
			roadmap.innerHTML = "";
			
			// Column 0 is the "mission"
			// Create an empty string so we can compare it later
			var mission = "";
            // We want to keep a list of missions to avoid duplicate sections if the data file is out of order
            var missions = [];
            
            // Give each entry its own unique ID number
            var rowID = 0;
            
            // Loop on the row Array (change row=0 if you also want to read 1st row)
            for (var row = 1; row < rowData.length; row++) {
				
                // Split by tab (\t) to get column Array
                rowColData = rowData[row].split('\t');
                var rowID = rowID + 1;
 
                // Loop on the row column Array
                for (var col = 0; col < rowColData.length; col++) {
					
                    // Get the teams data
                    var teams = rowColData[5].replace(/^"(.+(?="$))"$/, '$1').split(',');
                    // Get the themes data
                    var themes = rowColData[6].replace(/^"(.+(?="$))"$/, '$1').split(',');
                    
					if (col == 0) {
						// Column 0 is the "mission"
                        // Store the value of the cell
                        var goal = rowColData[col];
                        var missionID = encodeURIComponent(rowColData[col].replace(/[\W_]+/g,"-").toLowerCase());
						// Check if the mission this time is the same as last time
						if (goal != mission && !missions.includes(missionID)) {
                            // For the first column, if this is the first instance of that goal, create a heading
                            
							roadmap.innerHTML += `
								<div id="`+ missionID +`" class="govuk-grid-column-full govuk-!-margin-top-9">
									<h1 class="govuk-heading-xl">` 
								+  goal.replace(/^"(.+(?="$))"$/, '$1') + 
									`</h1>
								</div>`;
                            
                            roadmap.innerHTML += `
                                <div class="govuk-grid-column-one-third">
		                            <h2 class="govuk-heading-l">
			                            Now
		                            </h2>
                                    <div id="now--` + missionID +  `">
                                        
                                    </div>
                                </div>
                            `
                            
                            roadmap.innerHTML += `
                                <div class="govuk-grid-column-one-third">
		                            <h2 class="govuk-heading-l">
			                            Next
		                            </h2>
                                    <div id="next--` + missionID +  `">
                                        
                                    </div>
                                </div>
                            `
                            
                            roadmap.innerHTML += `
                                <div class="govuk-grid-column-one-third">
		                            <h2 class="govuk-heading-l">
			                            Future
		                            </h2>
                                    <div id="future--` + missionID +  `">
                                        
                                    </div>
                                </div>
                            `
							// Save this string so we can compare it later
                            var mission = rowColData[col];
                            missions.push(missionID);
						} else {
                            // If we already have the relevant heading, skip
							console.log('Repeated heading (' + mission + ') – skipping');
						}
                    } else if (col == 1) {
                        // Column 1 is the "Period" – now, next, future
                        var now = document.getElementById('now--' + missionID);
                        var next = document.getElementById('next--' + missionID);
                        var future = document.getElementById('future--' + missionID);
                        if (rowColData[col].toLowerCase() == 'now') {
                            now.innerHTML += `
                                <details class="govuk-mission">
                                    <summary class="govuk-mission--summary">
                                        <h3 class="govuk-heading-m govuk-mission--summary-title">
							                ` + rowColData[3].replace(/^"(.+(?="$))"$/, '$1') + `
						                </h3>
                                    </summary>
				                    <div class="govuk-mission--content">
				                        <p class="govuk-body">
					                        ` + rowColData[4].replace(/^"(.+(?="$))"$/, '$1') + `
				                        </p>
					                    <h4 class="govuk-heading-s">Teams</h4>
					                    <p id="teams-`+ rowID +`" class="govuk-body">
                                        </p>
					                    <h4 class="govuk-heading-s">Themes</h4>
					                    <p id="themes-`+ rowID +`" class="govuk-body">
                                        </p>
				                    </div>
			                    </details>
                            `
                        } else if (rowColData[col].toLowerCase() == 'next') {
                            next.innerHTML += `
                                <details class="govuk-mission">
                                    <summary class="govuk-mission--summary">
                                        <h3 class="govuk-heading-m govuk-mission--summary-title">
							                ` + rowColData[3].replace(/^"(.+(?="$))"$/, '$1') + `
						                </h3>
                                    </summary>
				                    <div class="govuk-mission--content">
				                        <p class="govuk-body">
					                        ` + rowColData[4].replace(/^"(.+(?="$))"$/, '$1') + `
				                        </p>
					                    <h4 class="govuk-heading-s">Teams</h4>
					                    <p id="teams-`+ rowID +`" class="govuk-body">
                                        </p>
					                    <h4 class="govuk-heading-s">Themes</h4>
					                    <p id="themes-`+ rowID +`" class="govuk-body">
                                        </p>
				                    </div>
			                    </details>
                            `
                        } else if (rowColData[col].toLowerCase() == 'future') {
                            future.innerHTML += `
                                <details class="govuk-mission">
                                    <summary class="govuk-mission--summary">
                                        <h3 class="govuk-heading-m govuk-mission--summary-title">
							                ` + rowColData[3].replace(/^"(.+(?="$))"$/, '$1') + `
						                </h3>
                                    </summary>
				                    <div class="govuk-mission--content">
				                        <p class="govuk-body">
					                        ` + rowColData[4].replace(/^"(.+(?="$))"$/, '$1') + `
				                        </p>
					                    <h4 class="govuk-heading-s">Teams</h4>
					                    <p id="teams-`+ rowID +`" class="govuk-body">
                                        </p>
					                    <h4 class="govuk-heading-s">Themes</h4>
					                    <p id="themes-`+ rowID +`" class="govuk-body">
                                        </p>
				                    </div>
			                    </details>
                            `
                        }
					} else if (col == 5) {
                        var team = document.getElementById('teams-' + rowID);
                        for (var i = 0; i < teams.length; i++) {
                            team.innerHTML += '<strong class="govuk-tag govuk-tag--blue">' + teams[i] + '</strong> ';
                        }
                    } else if (col == 6) {
                        var theme = document.getElementById('themes-' + rowID);
                        for (var i = 0; i < themes.length; i++) {
                            theme.innerHTML += '<strong class="govuk-tag govuk-tag--yellow">' + themes[i] + '</strong> ';
                        }
                    } else {
					    // Do nothing
					}

                 }

            }
			
            var fileParser = document.getElementById("fileParser");
            fileParser.remove();
            
            var govukHeader = document.getElementById("govuk-header");
            govukHeader.classList.remove('govuk-width-container');
            govukHeader.classList.add('govuk-width-container--wide');
        };

    } else {
        alert("Please select a file.");
    }

}

