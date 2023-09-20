function init(){
    displayResumes();

    document.getElementById('save-resume').addEventListener('click',SaveResume);

    document.querySelector('.modal').addEventListener('hidden.bs.modal',clearForm)

}

function SaveResume(){
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const resumeId = document.getElementById('resume-id').value;



    if(resumeId === '')
  {
    const newResume = {
        id:Date.now(),
        name : name,
        email:email
    }
    const resumes = JSON.parse(localStorage.getItem('resumes')) || [];
    resumes.push(newResume);
    localStorage.setItem('resumes',JSON.stringify(resumes));
  }
  else{
    const resumes = JSON.parse(localStorage.getItem('resumes'));
    const index = resumes.findIndex(resume => resume.id === Number(resumeId));
    resumes[index].name = name;
    resumes[index].email = email;
    localStorage.setItem('resumes',JSON.stringify(resumes));
  }

  $('#myModal').modal('hide');
  displayResumes();
}


function displayResumes(){
    const resumes = JSON.parse(localStorage.getItem('resumes')) || [];
    const resumeList = document.getElementById('resume-list');
    resumeList.innerHTML = '';

    for (const resume of resumes){
        const row = `
        <tr>
        <td>${resume.name}</td>
        <td>${resume.email}</td>
        <td>
            <button class="btn-primary btn-sm" onclick="editResume(${resume.id})">Edit</button>
               <button class="btn-danger btn-sm" onclick="deleteResume(${resume.id})">delete</button>
        </td>
        </tr>`

        resumeList.innerHTML+=row;
    }
}


function editResume(id){
    const resume = JSON.parse(localStorage.getItem('resumes')).find(resume => resume.id === id)
    document.getElementById('resume-id').value = resume.id;
    document.getElementById('name').value = resume.name;
    document.getElementById('email').value = resume.name
    $('#myModal').modal('show');
}

function deleteResume(id){
    const resumes = JSON.parse(localStorage.getItem('resumes'));
    resumes.filter(resume => resume.id !== id)
    localStorage.setItem('resumes',JSON.stringify(resumes))
    displayResumes();
}

function clearForm(){
    document.getElementById('resume-id') = '';
    document.getElementById('name') = '';
    document.getElementById('email') = '';
    
}

init();