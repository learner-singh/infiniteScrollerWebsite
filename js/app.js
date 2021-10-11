window.addEventListener("load", init)
window.addEventListener("scroll", onScroll)

let colleges = null
let counter = 0

const container = document.getElementById("container")

function makeCard(college) {
    const card = document.querySelector('#college_card_template').content.cloneNode(true)
    card.querySelector('.heading').innerText = college.college_name
    if (!college.promoted) {
        card.querySelector(".arrowTail").remove()
    }
    card.querySelector('.discount').innerText = college.discount
    card.querySelector('.originalFees').innerHTML = "&#8377;" + college.original_fees
    card.querySelector('.discountedFees').innerHTML = "&#8377;" + college.discounted_fees
    card.querySelector('.feesCycle').innerText = college.fees_cycle

    card.querySelector(".poster_college").style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://learner-singh.github.io/img/' + college.image + '")'

    card.querySelector('.ranking').innerText = college.ranking
    var tags = card.querySelectorAll('.tags')
    tags[0].innerText = college.tags[0]
    tags[1].innerText = college.tags[1]

    var amenties = card.querySelectorAll('.amenties')
    amenties[0].innerText = college.amenties[0]
    amenties[1].innerText = college.amenties[1]

    card.querySelector('.rating').innerText = college.rating
    card.querySelector('.ratingRemarks').innerText = college.rating_remarks
    card.querySelector('.famousNearestPlaces').innerText = college.famous_nearest_places

    var nearestPlace = card.querySelectorAll('.nearestPlace')
    nearestPlace[0].innerText = college.nearest_place[0]
    nearestPlace[1].innerText = college.nearest_place[1]

    card.querySelector('.offertext').innerText = college.offertext

    var fa = card.querySelectorAll(".fa")

    for (let idx = 0; idx < 5; idx++) {
        if (idx < college.rating) {
            fa[idx].classList.add("fa-star")
        }
        else {
            fa[idx].classList.add("fa-star-o")
        }
    }
    return card
}

async function loadJson(resourceAdress) {
    let response = await fetch(resourceAdress)
    response = response.json()
    return response
}

async function init() {
    let collegeList = await loadJson("/infiniteScrollerWebsite/colleges.json")
    colleges = collegeList.colleges
    loadNextWindow()
}

function loadNextWindow() {
    counter++
    const start = (counter - 1) * 10

    if (start > colleges.length - 1) {
        return
    }

    const end = (colleges.length - 1 <= start + 9) ? (colleges.length - 1) : (start + 9)
    const container = document.getElementById("container")
    for (let idx = start; idx <= end; idx++) {
        container.append(makeCard(colleges[idx]))
    }
}

function onScroll() {
    if (window.scrollY + window.innerHeight >= document.scrollingElement.scrollHeight) {
        loadNextWindow()
    }
}