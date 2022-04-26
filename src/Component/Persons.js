import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const apiUrl = 'https://sheetdb.io/api/v1/vpm85ghelydsv'

function callApi() {
  return Promise.resolve();
}

export default function Persons() {
  const [danhSach, setDanhSach] = useState([])
  const [updatePerson, setUpdatePerson] = useState(null)
  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    console.log(danhSach)
  }, [danhSach])

  useEffect(() => {
    try {
      axios.get(apiUrl).then((response) => {
        setDanhSach(response.data)
      })
    } catch (e) {
      console.log(e)
    }
  }, [])

  const handleChangeInput = useCallback(
    (event, col) =>
      setUpdatePerson((updatePerson) => {
        const nextStateUpdatePerson = { ...updatePerson }
        nextStateUpdatePerson[col] = event.target.value
        return nextStateUpdatePerson
      }),
    []
  )

  const handleSave = useCallback(() => {
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
    // Call Api Add / Update
    // const method = isNew ? 'post' : 'put'
    callApi().then(() => {
      setUpdatePerson(null)
      setIsNew(false)
    })
  }, [isNew, updatePerson])

  const handleAdd = useCallback(() => {
    const newPerson = {
      Id: String(
        Number(
          danhSach.reduce((acc, person) => (person.Id > acc.Id ? person : acc))
            .Id
        ) + 1
      ),
      Hoten: '',
      Namsinh: '',
      Quequan: '',
      Chucvu: '',
    }
    setIsNew(true)
    setDanhSach([
      ...danhSach,
      {
        ...newPerson,
      },
    ])
    setUpdatePerson({ ...newPerson })
  }, [danhSach])

  const handleDelete = (nhansu) => {
    console.log('Xoa id: ', nhansu.Id);
    setDanhSach((prevDanhsach) => {
      const nextDanhsach = prevDanhsach.filter(person => person.Id !== nhansu.Id)
      return nextDanhsach
    })
    // Call Api Delete
  }

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
            <tr key={nhansu.Id + nhansu.Hoten}>
              {cols.map((col) => {
                return (
                  <td key={col}>
                    {nhansu.Id !== updatePerson?.Id ? (
                      nhansu[col]
                    ) : col === 'Id' ? (
                      nhansu[col]
                    ) : (
                      <input
                        onChange={(event) => handleChangeInput(event, col)}
                        value={updatePerson?.[col] ?? ''}
                      />
                    )}
                  </td>
                )
              })}
              <td>
                {nhansu.Id === updatePerson?.Id ? (
                  <button onClick={handleSave} className="btn btn-primary">
                    Lưu
                  </button>
                ) : (
                  <>
                  <button
                    onClick={() => setUpdatePerson(nhansu)}
                    className="btn btn-primary"
                  >
                    Sửa
                  </button>
                  <button onClick={() => handleDelete(nhansu)} className="btn btn-primary" style={{marginLeft: '5px'}}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  </>
                )}
              </td>
            </tr>
          )
        })}
        <tr>
          <td colSpan={6}>
            <button onClick={handleAdd} className="btn btn-primary">
              Thêm
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
