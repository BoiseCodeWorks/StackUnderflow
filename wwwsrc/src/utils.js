import axios from 'axios'
import Swal from "sweetalert2";

let baseURL = location.port != "5001" ? "https://localhost:5001" : ""

export let api = axios.create({
  baseURL: baseURL + '/api',
  timeout: 8000,
  withCredentials: true
})

export let auth = axios.create({
  baseURL: baseURL + '/account',
  timeout: 8000,
  withCredentials: true
})

export const toast = function toast({ title, text = '', type = 'success', timer = 5500 }) {
  return Swal.fire({
    title,
    text,
    type,
    timer,
    showConfirmButton: false,
    position: 'top-right',
    toast: true,
  })
}

export const toastError = function toastError(error) {
  if (!error) { return toast({ title: "An uknown error occured", type: 'error' }) }
  let title = error.message || "An error occured"
  if (!error.isAxiosError || !error.response) { return toast({ title, type: 'error' }) }
  handleAxiosError(error)
}
function handleAxiosError(error) {
  let data = error.response.data
  var text = ""
  if(typeof data == "string"){
    text = data
  }
  if (!text && data.errors) {
    for (let k in data.errors) {
      text += `${k}: ${data.errors[k][0]}` 
    }
  }
  if (!text) {
    text = data.message ? data.message : error.message
  }
  let title = `${error.code || ''} Request Error`
  toast({ title, text: text, type: "error", timer: 15000 })
}

export const confirm = async function confirm({ text, title = "Are you sure", type = "question", confirmButtonText = 'Ok', cancelButtonText = 'Cancel' }) {
  try {
    let res = await Swal.fire({
      title,
      text,
      type,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      allowOutsideClick: false
    })
    return res.value
  } catch (e) {
    console.error(e)
  }
}