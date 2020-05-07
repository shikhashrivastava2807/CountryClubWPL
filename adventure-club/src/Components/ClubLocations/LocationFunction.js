import axios from 'axios'

export const createNewClubs = newClub => {
    return axios
        .post('http://localhost:3000/clubs', {

        club_name: newClub.club_name,
            club_type: newClub.club_type,
        address_line1: newClub.address_line1,
        address_line2: newClub.address_line2,
        zip: newClub.zip,
        City: newClub.City,
        State: newClub.State,
        imagesPath : [
            newClub.imagesPath[0],
            newClub.imagesPath[1],
            newClub.imagesPath[2]
        ],
            status: "1",
        description: newClub.description,
        activities: [
        {
            "name": "Spa",
            "category": "Recreational",
            "description": "Relaxes your mind",
            "booking_needed": "1",
            "status": 1
        },
        {
            "name": "Miniature Golf",
            "category": "Outdoor",
            "description": "fun activity",
            "booking_needed": "1",
            "status": 1
        },
        {
            "name": "Badminton",
            "category": "Indoor",
            "description": "Great workout",
            "booking_needed": "1",
            "status": 1
        }
    ]
        })
        .then(response => {
            console.log('Club Created')
        })
}

export const editClub = clubInfo => {
    return axios
        .put('http://localhost:3000/clubs/'+ clubInfo.id, clubInfo)
        .then(response => {
            console.log('Club Created')
        })
}

