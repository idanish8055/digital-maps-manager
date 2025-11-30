import useAuth from '../hooks/auth-hook';

const getdata = () => {
  return JSON.parse(localStorage.getItem("userData"));
}

export const checkLogin = () => {
  let token = getdata()?.token ? getdata().token : null;
  if (token === null) return false
  return true
}

export const checkRole = () => {
  let role = getdata()?.role ? getdata().role : null;
  if (role === 'admin') return true;
  return false;
  
}

export const selectedProject = () => {
  if(localStorage.getItem("selectedProject")){
    return true;
  }
  else{
    return false;
  }
}
export const selectedProjectName = () => {
  if(localStorage.getItem("selectedProject")){
    return localStorage.getItem("selectedProject");
  }
  else{
    return false;
  }
}




