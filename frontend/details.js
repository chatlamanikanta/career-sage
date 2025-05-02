document.getElementById('studentForm').addEventListener('submit',async (event)=>{
    event.preventDefault();

    let name=document.getElementById('name').value;
    let age=document.getElementById('age').value;
    let tenth_marks=document.getElementById('tenth_marks').value;
    let twelth_marks=document.getElementById('twelth_marks').value;


    document.getElementById("spinnerOverlay").classList.remove("d-none");
    const selectedSkills = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
    if (selectedSkills.length === 0) {
        alert('Please select at least one skill');
        return;
    }
    const details={
        name,
        age,
        tenth_marks,
        twelth_marks,
        selectedSkills 
    };
    console.log(details);
    try{
        const response=await fetch('http://127.0.0.1:8000/details',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(details)
        });
        if(response.ok){
            let data=await response.json();
            localStorage.setItem('prediction',JSON.stringify(data));
            window.location.href='./frontend/result.html';
        }else{
            document.getElementById("spinnerOverlay").classList.add("d-none");
            console.error("Failed to submit");
            alert("Failed to submit details");
        }
    }
    catch(error){
        console.error("Error: ",error);
        alert("Something went wrong");
    }


})
const skills = ['Accounting', 'Administration', 'Adobe XD', 
    'Advertising', 'Algorithms', 'Analytics', 'Anatomy', 'Aptitude', 
    'Argumentation', 'Assessment', 'AutoCAD', 'Big Data', 'Biology', 
    'Branding', 'Building Codes', 'Business Development', 'CAD', 'Chemistry', 
    'Classroom Management', 'Client Counseling', 'Clinical Knowledge', 'Communication', 
    'Community Management', 'Construction Management', 'Content Marketing', 'Content Planning', 
    'Content Strategy', 'Counseling', 'Court Procedures', 'Creative Writing', 'Creativity', 'Critical Thinking', 
    'DSA', 'Data Analysis', 'Data Visualization', 'Debugging', 'Design Principles', 'Documentation', 'Editing', 
    'Email Marketing', 'Excel', 'Experimentation', 'Finance Knowledge', 'Financial Modeling', 'Fundraising', 
    'General Awareness', 'Geotechnical Engineering', 'Google Ads', 'Illustrator', 'Innovation', 'Investment Analysis', 
    'Laboratory Skills', 'Law Knowledge', 'Leadership', 'Legal Research', 'Lesson Planning', 'Machine Design', 
    'Machine Learning', 'Management', 'Manufacturing', 'Materials Science', 'Medical Research', 'Negotiation', 
    'Patient Care', 'Photoshop', 'Pitching', 'Problem Solving', 'Programming', 'Project Management', 'Proofreading', 
    'Prototyping', 'Python', 'Reasoning', 'Requirement Gathering', 'Research Methods', 'SEO', 'SEO Writing', 'SQL', 
    'Scientific Writing', 'Social Media Strategy', 'Startup Strategy', 'Statistics', 'Strategy', 'Structural Analysis', 
    'Structural Design', 'Subject Knowledge', 'Surveying', 'System Design', 'Teamwork', 'Therapy Techniques', 
    'Thermodynamics', 'Typography', 'UI/UX Design', 'User Research', 'Valuation', 'Wireframing']

const skillsContainer = document.getElementById('skillsContainer'); 
    

skills.forEach((skill, index) => {
    const skillElement = document.createElement('div');
    skillElement.classList.add('col-lg-3', 'col-md-4', 'col-sm-6'); 

    const skillCheckbox = document.createElement('div');
    skillCheckbox.classList.add('form-check');    
    const checkbox = document.createElement('input');
    checkbox.classList.add('form-check-input');
    checkbox.type = 'checkbox';
    checkbox.value = skill;
    checkbox.id = 'skill_' + index; 
    
    const label = document.createElement('label');
    label.classList.add('form-check-label');
    label.style.cursor="pointer";
    label.setAttribute('for', checkbox.id);
    label.textContent = skill;


    skillCheckbox.appendChild(checkbox);
    skillCheckbox.appendChild(label);
    skillElement.appendChild(skillCheckbox);
    skillsContainer.appendChild(skillElement);
});

