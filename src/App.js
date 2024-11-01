import axios from 'axios'
import React, { useState, useEffect } from 'react'

function App() {
  const [users, setUsers] = useState([]) //API'dan gelen kullanıcılar
  const [searchUsers, setSearchUsers] = useState('') //aranan kullanıcılar
  const [filteredUsers, setFilteredUsers] = useState([]) //filtrelenen kullanıcılar

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api?results=15')
        /*
        bu kısımda data object içinde çekiliyor ve bu object içinde results keyi ile verilen array içinde yine object içinde name key'i ile title, first, last bulunuyor. Bu datayı parçalamak için response'dan gelen data'yı results keyi olduğu için response.data.results.map() olarak parçalıyoruz, daha sonra içeride user ile yeni bir object oluşturup buna title, firstName, lastName keyleri ile gelen veriyi bu değişkene aktardık ve sonuç olarak elde ettiğimiz userData değişkeni içerisinde object'mizi setUsers ile users state'ine aktardık, artık başta [] boş array olan users state'i { } userData object'sini içeriyor. 
        */
        const userData = response.data.results.map((user) => ({
          title: user.name.title,
          firstName: user.name.first,
          lastName: user.name.last,
        }))
        setUsers(userData)
        setFilteredUsers(userData) //tüm kullanıcılar filtrelemeden önce gelir.
      } catch (err) {
        console.log(err, 'Veri Hatası')
      }
    }

    fetchData()
  }, [])

  const handleSearch = (e) => {
    //klasik input'tan gelen veriyi olay işleyici ile küçük-büyük harf duyarlılığından kurtadık ve searchUsers state'e işledik.
    const inputSearch = e.target.value.trim().toLowerCase()
    setSearchUsers(inputSearch)
    //gelen kullanıcı verilerini(users stae'i üstte uzun açıklama) filtereledik ve harf duyarlılığından kurtarıp, input'tan gelen arama içeriyorsa göstermesini sağladık sonra setFilteredUsers ile ilgili state filteredUsers'a işledik. Bu sayede JSX içerisinde map() ile parçalanıp li ile listelenecektir.
    const filtered = users.filter((user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(inputSearch)
    )
    setFilteredUsers(filtered)
  }

  return (
    <div className="flex flex-col text-center items-center justify-center">
      <input
        type="text"
        placeholder="Search users"
        value={searchUsers}
        onChange={handleSearch}
        className="mb-4 mt-4"
      />
      <ul>
        {filteredUsers.map((user, index) => (
          <li key={index} className="mb-1">
            {user.title} {user.firstName} {user.lastName}{' '}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
