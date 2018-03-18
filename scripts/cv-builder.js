var bio = {
	"name": "Manuel Filipe Silva Goulão",
	"role": "Student at Instituto Superior Técnico",
	"contacts": {
		"mobile": "960332864",
		"email": "msilvagoula@gmail.com",
		"github": "mgoulao",
		"twitter": "@mgoulao_1",
		"location": "Santarém, Portugal"
	},
	"picture": "https://assets.hole19golf.com/users/avatars/000/708/092/thumb/bab510e5579907d21318109512e78bc462738876.jpeg",
	"welcomeMessage": "I'm from Lisbon, Portugal and I'm studying Telecommunications and Informatics Engineering at Instituto Superior Técnico.",
	"skills": ["Web Development", "HTML", "CSS", "Javascript", "Android Development"]
};
var work = {
	"jobs": []/*[
		{
			"employer": "none",
			"title": "none",
			"location": "none",
			"datesWorked": "none",
			"description": "none"
		}
	]*/
};

var education = {
	"schools": [
		{
			"name": "Escola Secundária Dr. Ginestal Machado",
			"datesAttended": "2013 - 2016",
			"location": "Santarém, Portugal",
			"degree": "High School",
			"url": "http://agrupamento-ginestalmachado.net/"
		}
	],
	"onlineCourses": [
		{
			"school": "Udacity",
			"title": "Android Basics Nanodegree, EU Scholarship",
			"completed": "July 2017",
			"url": "https://www.udacity.com/google-scholarships"
		}
	]
};

var projects = {
    "projects": [
        {
            "title": "Tesla Portugal",
            "img": "./resources/tesla-logo-big.png",
			"color": "mg-green",
			"dates": "2017 - 2018",
			"description": "",
			"images": [],
            "link": "https://teslaportugal.blogspot.com"
        },
        {
            "title": "Chess Mate",
            "img": "./chess/Wallpaper-big.png",
			"color": "mg-almost-black",
			"dates": "2017 - 2018",
			"description": "",
			"images": [],
            "link": "https://esteveste.github.io/Chess_Google_Assistant_Contest"
        },
         {
            "title": "Fuchsia Web Demo",
            "img": "",
			"color": "mg-probably-red",
			"dates": "2017 - 2018",
			"description": "",
			"images": [],
            "link": "https://mgoulao.github.io/fuchsia/"
        },
        {
            "title": "EV Map",
            "img": "./resources/ev-map.webp",
			"color": "mg-kinda-purple",
			"dates": "2017 - 2018",
			"description": "",
			"images": [],
            "link": "#"
        }
    ]
}
/*var projects = {
	"projects": [
		{
			"title": "Tesla Portugal",
			"dates": "2014 - 2017",
			"description": "Tesla Portugal is a blog that aims to promote the Tesla brand in Portugal.",
			"images": []
		}]
}
*/

var formattedName = HTMLheaderName.replace("%data%", bio.name);
var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
var formattedBioPic = HTMLbioPic.replace("%data%", bio.picture);
var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);

$("#mg-cv-about").prepend(formattedWelcomeMsg);
$("#mg-cv-about").prepend(formattedRole);
$("#mg-cv-about").prepend(formattedName);
$("#header").prepend(formattedBioPic);

var numProjects = projects.projects.length;

if (work.jobs.length > 0) {

	$("#workExperience").append(HTMLworkStart);

	for (i in work.jobs) {
		var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[i].employer);
		var formattedWorkTitle = HTMLworkTitle.replace("%data%", work.jobs[i].title);
		var formattedWorkLocation = HTMLworkLocation.replace("%data%", work.jobs[i].location);
		var formattedDatesWorked = HTMLworkDates.replace("%data%", work.jobs[i].datesWorked);
		var formattedWorkDescription = HTMLworkDescription.replace("%data%", work.jobs[i].description);

		var formattedEmployerWorkTitle = formattedEmployer + formattedWorkTitle;

		$(".work-entry:last").append(formattedEmployerWorkTitle);
		$(".work-entry:last").append(formattedWorkLocation);
		$(".work-entry:last").append(formattedDatesWorked);
		$(".work-entry:last").append(formattedWorkDescription);
	}
}


for (var i = 0; i < numProjects; i++) {
	$("#projects").append(HTMLprojectStart);

	var formattedProjectTitle = HTMLprojectTitle.replace("%data%", projects.projects[i].title);
	var formattedProjectDates = HTMLprojectDates.replace("%data%", projects.projects[i].dates);
	var formattedProjectDescription = HTMLprojectDescription.replace("%data%", projects.projects[i].description);

	for (img in projects.projects[i].images) {
		var formattedProjectImage = HTMLprojectImage.replace("%data%", projects.projects[i].images[img]);
		$(".project-entry:last").append(formattedProjectImage);
	}
	$(".project-entry:last").append(formattedProjectTitle);
	$(".project-entry:last").append(formattedProjectDates);
	$(".project-entry:last").append(formattedProjectDescription);
}


if (education.schools.length > 0 || education.onlineCourses.length > 0) {
	for (i in education.schools) {
		$("#education").append(HTMLschoolStart);

		var formattedSchoolName = HTMLschoolName.replace("%data%", education.schools[i].name).replace("#", education.schools[i].url);
		var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", education.schools[i].degree);
		var formattedSchoolDates = HTMLschoolDates.replace("%data%", education.schools[i].datesAttended);
		var formattedSchoolLocation = HTMLschoolLocation.replace("%data%", education.schools[i].location);
		var formattedSchoolMajor = HTMLschoolMajor.replace("%data%", education.schools[i].major);

		$(".education-entry:last").append(formattedSchoolName + formattedSchoolDegree);
		$(".education-entry:last").append(formattedSchoolDates);
		$(".education-entry:last").append(formattedSchoolLocation);
		$(".education-entry:last").append(formattedSchoolMajor);
	}

	if (education.onlineCourses.length > 0) {
		$("#education").append(HTMLonlineClasses);
		for (i in education.onlineCourses) {
			$("#education").append(HTMLschoolStart);
			var formattedOnlineTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[i].title).replace("#", education.onlineCourses[i].url);
			var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[i].school);
			var formattedOnlineDates = HTMLonlineDates.replace("%data%", education.onlineCourses[i].completed);
			var formattedOnlineURL = HTMLonlineURL.replace("%data%", education.onlineCourses[i].url).replace("#", education.onlineCourses[i].url);

			$(".education-entry:last").append(formattedOnlineTitle + formattedOnlineSchool);
			$(".education-entry:last").append(formattedOnlineDates);
			$(".education-entry:last").append(formattedOnlineURL);
		}
	}

}