import ManagementHead from '../ManagementHead.jsx'
import { useState, useEffect } from 'react'

function ManageEvent() {
    const [eventData, setEventData] = useState([])
    const [newImg, setNewImg] = useState(null)

    //이벤트 정보 조회
    useEffect(() => {
        fetch("http://localhost:3000/eventinfo")
            .then(response => response.json())
            .then(data => setEventData(data))
    }, [eventData])

    function upload() {
        if (!newImg) {
            alert("파일이 선택되지 않았습니다.")
            return
        }
        const formData = new FormData();
        for (let i = 0; i < newImg.length; i++) {
            formData.append('eventPoster', newImg[i])
        }
        fetch('http://localhost:3000/event/add', {
            method: "POST",
            body: formData
        })
    }

    function posterDel(defid) {
        fetch('http://localhost:3000/event/delete', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ defid: defid })
        })
    }

    return (
        <div className="admin-page admin-event-page">
            <ManagementHead />

            <main className="admin-main">
                <h1 className="admin-title">이벤트 관리</h1>

                <section className="admin-section admin-section--form">
                    <h2 className="admin-subtitle">신규 포스터 등록</h2>
                    <div className="admin-form-row">
                        <input
                            className="admin-file"
                            type="file"
                            multiple
                            onChange={(e) => setNewImg(e.target.files)}
                        />
                        <button
                            className="admin-button admin-button--primary"
                            onClick={upload}
                        >
                            등록
                        </button>
                    </div>
                </section>

                <hr className="admin-divider" />

                <section className="admin-section admin-section--list">
                    <h2 className="admin-subtitle">이벤트 포스터 목록</h2>
                    <div className="admin-grid admin-grid--poster">
                        {eventData.map((item) => (
                            <div className="admin-card admin-card--poster" key={item.defid}>
                                <div className="admin-card-image-wrap">
                                    <img
                                        className="admin-card-image"
                                        src={`http://localhost:3000${item.poster_path}`}
                                        alt={item.poster_name}
                                    />
                                </div>
                                <div className="admin-card-actions">
                                    <button
                                        className="admin-button admin-button--danger admin-button--small"
                                        onClick={(e) => posterDel(item.defid)}
                                    >
                                        포스터 삭제
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default ManageEvent
