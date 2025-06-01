const formData = {
  email: '',
  message: '',
};

const registerForm = document.querySelector('.feedback-form');
registerForm.addEventListener('submit', handleSubmit);
registerForm.addEventListener('input', e => {
  const field = e.target;
  formData[field.name] = field.value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.feedback-form');
  const formState = localStorage.getItem('feedback-form-state');
  if (!formState) {
    return;
  }

  let data;
  try {
    data = JSON.parse(formState);
  } catch (err) {
    console.error('Wrong data in local storage', err);
    return;
  }

  if (data.email) {
    form.elements.email.value = data.email;
    formData.email = data.email;
  }
  if (data.message) {
    form.elements.message.value = data.message;
    formData.message = data.message;
  }
});

function handleSubmit(e) {
  e.preventDefault();
  const formState = localStorage.getItem('feedback-form-state');
  if (formState) {
    let data;
    try {
      data = JSON.parse(formState);
    } catch (err) {
      console.error('Wrong data in local storage', err);
      return;
    }
    const email = data.email;
    const message = data.message;
    if (email != '' && message != '') {
      localStorage.removeItem('feedback-form-state');
      e.target.reset();
      console.log(formData);
      return;
    }
  }
  return alert('Fill please all fields');
}
