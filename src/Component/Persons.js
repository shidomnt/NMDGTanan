import React, { useEffect, useState } from 'react'
import axios from 'axios'

const apiUrl = 'https://sheetdb.io/api/v1/vpm85ghelydsv'
function callApi() {
  console.log('callApi')
  return Promise.resolve({})
}

export default function Persons() {
  const [danhSach, setDanhSach] = useState([])
  const [updatePerson, setUpdatePerson] = useState(null)
  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    try {
      axios.get(apiUrl).then((response) => {
        setDanhSach(response.data)
      })
    } catch (e) {
      console.log(e)
    }
  }, [])
  return danhSach.length === 0 ? (
    <div>Loading...</div>
  ) : (
    <table className="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Họ tên</th>
          <th>Năm sinh</th>
          <th>Quê quán</th>
          <th>Chức vụ</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {danhSach.map((nhansu) => {
          const cols = Object.keys(nhansu)
          return (
            <tr key={nhansu.Id}>
              {cols.map((col) => {
                return (
                  <td key={col}>
                    {nhansu.Id !== updatePerson?.Id ? (
                      nhansu[col]
                    ) : col === 'Id' ? (
                      nhansu[col]
                    ) : (
                      <input
                        onChange={(event) =>
                          setUpdatePerson((updatePerson) => {
                            const nextStateUpdatePerson = { ...updatePerson }
                            nextStateUpdatePerson[col] = event.target.value
                            return nextStateUpdatePerson
                          })
                        }
                        value={updatePerson?.[col] ?? ''}
                      />
                    )}
                  </td>
                )
              })}
              <td>
                {nhansu.Id === updatePerson?.Id ? (
                  <button
                    onClick={() => {
                      setDanhSach((prevDanhSach) => {
                        let nextDanhSach = [...prevDanhSach]
                        nextDanhSach = nextDanhSach.map((person) => {
                          if (person.Id === updatePerson?.Id) {
                            return { ...updatePerson }
                          }
                          return person
                        })
                        return nextDanhSach
                      })
                      const method = isNew ? 'post' : 'put'
                      callApi().then(() => {
                        setUpdatePerson(null)
                        setIsNew(false)
                      })
                    }}
                    className="btn btn-primary"
                  >
                    Lưu
                  </button>
                ) : (
                  <button
                    onClick={() => setUpdatePerson(nhansu)}
                    className="btn btn-primary"
                  >
                    Sửa
                  </button>
                )}
              </td>
            </tr>
          )
        })}
        <tr>
          <td colSpan={6}>
            <button
              onClick={() => {
                const newPerson = {
                  Id: String(
                    Number(
                      danhSach.reduce((acc, person) =>
                        person.Id > acc.Id ? person : acc
                      ).Id
                    ) + 1
                  ),
                }
                setIsNew(true)
                setDanhSach([
                  ...danhSach,
                  {
                    ...newPerson,
                    Hoten: '',
                    Namsinh: '',
                    Quequan: '',
                    Chucvu: '',
                  },
                ])
                setUpdatePerson({ ...newPerson })
              }}
              className="btn btn-primary"
            >
              Thêm
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
