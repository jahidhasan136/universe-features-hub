let isSorted = false
const universeData = async dataLimit => {
  toggleLoading(true)
  const URL =  `https://openapi.programming-hero.com/api/ai/tools`
  const res = await fetch(URL)
  const data = await res.json()
  if(isSorted){
    const sortDate = data.data.tools.sort((a, b) => new Date(b.published_in) - new Date(a.published_in))
    displayData(sortDate, dataLimit)
  }
  else{
    displayData(data.data.tools ,dataLimit)
  }
}

const sortButton = () => {
  toggleLoading(true)
  isSorted = true
  universeData(6)
  
}


const displayData = (data , dataLimit) => {
  const showData = document.getElementById('show-data')
      showData.innerHTML = ''
    const showAll = document.getElementById('see-more')
    if(dataLimit && data.length > 6){
      data = data.slice(0,6)
      showAll.classList.remove('d-none')
    }
    else{
      showAll.classList.add('d-none')
    }
    data.forEach(card => {
      const cardDiv = document.createElement('div')
      cardDiv.innerHTML = `
      <div class="col h-100">
      <div class="card h-100 p-2">
      <img src=${card.image} class="card-img-top" alt="...">
      <div class="card-body">
      <h4 class="fw-bold">Features</h4>
      <ol class="card-text">
      <li>${card.features[0]}</li>
      <li>${card.features[1]}</li>
      <li>${card.features[2]}</li>
      </ol> 
      </div>
      <div class="card-footer">
      <h6 class="card-title fw-bold">${card.name}</h6>
      <div class="d-flex justify-content-between align-items-center">
      <small class="text-muted"><i class="fa fa-calendar-minus"></i> ${card.published_in}</small>
      
      <!-- Button trigger modal -->
      <button onclick="modalData('${card.id}')"  type="button" class="btn btn-outline-danger rounded-circle" data-bs-toggle="modal" data-bs-target="#exampleModal">
      <i class="fa fa-arrow-right"></i>
      </button>
      </div>
      </div>
      </div>
      `
      showData.appendChild(cardDiv)
    });
    toggleLoading(false)
    }
    
    const seeMore = document.getElementById('see-more').addEventListener('click', function(){
      universeData()
    })
    
    
    const modalData = async (id) => {
     const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`
      const res = await fetch(URL)
      const data = await res.json()
      displayModal(data.data)
    }
    
    const displayModal = (data) => {
      const modalDescription = document.getElementById('description')
      modalDescription.innerText = data.description
      const priceBox = document.getElementById('price')
      priceBox.innerHTML = `
      <div class="border px-3 py-4 d-flex align-items-center bg-light text-success fw-bold">${data.pricing[0].price === 'No cost' ? 'Free of cost / Basic' : data.pricing[0].price}</div>
      <div class="border px-3 py-4 d-flex align-items-center bg-light text-warning fw-bold">${data.pricing[1].price === 'No cost' ? 'Free of cost / Pro' : data.pricing[1].price}</div>
      <div class="border px-3 py-4 d-flex align-items-center bg-light text-danger fw-bold">${data.pricing[2].price === 'Contact us ' ? 'Free of cost / Enterprise' : data.pricing[2].price}</div>
      `
      const contentFeature = document.getElementById('content-feature')
      contentFeature.innerHTML = `
      <h4 class="text-black fw-bold">Features</h4>
      <ul>
      <li>${data.features[1].feature_name}</li>
      <li>${data.features[2].feature_name}</li>
      <li>${data.features[3].feature_name}</li>
      </ul>
      `
      const contentIntegration = document.getElementById('content-integration')
      contentIntegration.innerHTML = `
      <h4 class="text-black fw-bold">Integrations</h4>
      <ul>
      <li>${data.integrations[0] === undefined ? 'no data found' : data.integrations[0]}</li>
          <li class="${data.integrations[1] === undefined ? 'd-none' : data.integrations[1]}">${data.integrations[1]}</li>
          <li class="${data.integrations[2] === undefined ? 'd-none' : data.integrations[2]}">${data.integrations[2]}</li>
          </ul>
          `
          const inputOutputExamples = document.getElementById('examples')
          inputOutputExamples.innerHTML =`
          <div class="card p-2"  >
          <div class="position-relative">
          <img src=${data.image_link[0]} class="card-img-top" alt="...">
          <p class="bg-danger w-25 text-light text-center py-1 px-2 rounded position-absolute top-0 end-0 ${data.accuracy.score === null ? 'd-none' : data.accuracy.score}">
          ${data.accuracy.score * 100}% accuracy
          </p>
          </div>
          <div class="card-body">
          <h4 class="card-title text-center">${data.input_output_examples[0].input}</h4>
          <p class="card-text text-center">${data.input_output_examples[0].output}</p>
          <h4 class="card-title text-center">${data.input_output_examples[1].input}</h4>
          <p class="card-text text-center">${data.input_output_examples[1].output}</p>
          </div>
          </div>
          `
        }
        
        
        const toggleLoading = isLoading => {
          const loadingSpinner = document.getElementById('spinner')
          if(isLoading){
            loadingSpinner.classList.remove('d-none')
          }
          else{
            loadingSpinner.classList.add('d-none')
      }
    }
    
    modalData()
    
    
universeData(6)







