import ManagementHead from '../ManagementHead.jsx'
import { useState, useEffect } from 'react'

import baseImg from '../../img/기본프로필.png'

function ManageUser() {

    const [userData, setUserData] = useState([])

    useEffect(() => {
        fetch("http://192.168.0.227:3000/userinfo")
            .then(response => response.json())
            .then(data => setUserData(data))
    }, [userData])

    function deleteUser(defid) {
        const confirm = window.confirm(
            "삭제되면 다시는 복구할 수 없습니다. 정말로 해당 유저를 삭제하시겠습니까?")
        if (!confirm) {
            return;
        }
        fetch(`http://192.168.0.227:3000/deleteuser`, {
            method: "DELETE"
            , headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ defid: defid })
        })
        alert("해당 유저가 삭제되었습니다.")
    }

    function setProfile(defid) {
        const confirm = window.confirm(
            "기존 프로필을 복구할 수 없습니다. 정말로 기본 프로필로 변경하시겠습니까?")
        if (!confirm) {
            return;
        }
        fetch(`http://192.168.0.227:3000/setdefaultprofile`, {
            method: "PUT"
            , headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ defid: defid })
        })
        alert("기본 프로필로 변경되었습니다.")
    }

    function userEdit(id, item, itemKey) {
        const newData = prompt("수정할 내용을 입력해주세요.", item)
        if (!newData) {
            alert("내용이 입력되지 않았습니다.")
            return
        }
        fetch('http://192.168.0.227:3000/userupdate', {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                userDefid: id,
                field: itemKey,
                newData: newData
            })
        }
        )
    }

    return (
        <div className="admin-page admin-user-page">
            <ManagementHead />

            <main className="admin-main">
                <h1 className="admin-title">사용자 관리</h1>
                <hr className="admin-divider" />

                <section className="admin-section admin-section--list">
                    <div className="admin-grid admin-grid--users">
                        {userData.map((item) => (
                            <div className="admin-card admin-card--user" key={item.defid}>
                                <div className="admin-card-header admin-card-header--user">
                                    <button
                                        className="admin-button admin-button--danger admin-button--small"
                                        onClick={() => deleteUser(item.defid)}
                                    >
                                        유저 삭제
                                    </button>
                                </div>

                                <div className="admin-user-profile">
                                    <p className="admin-label">프로필 사진</p>
                                    <img
                                        className="admin-user-profile-img"
                                        src={`${item.profile ?
                                            `http://192.168.0.227:3000${item.profile}` : baseImg}`}
                                        alt={item.profile_name}
                                    />
                                    <button
                                        className="admin-button admin-button--small"
                                        onClick={(e) => setProfile(item.defid)}
                                    >
                                        기본 프로필로 변경
                                    </button>
                                </div>

                                <div className="admin-user-info">
                                    <p className="admin-text">
                                        이름 : {item.name}
                                        <button
                                            className="admin-button admin-button--tiny"
                                            onClick={(e) => userEdit(item.defid, item.name, "name")}
                                        >
                                            이름 변경
                                        </button>
                                    </p>

                                    <p className="admin-text">
                                        아이디 : {item.id}
                                        <button
                                            className="admin-button admin-button--tiny"
                                            onClick={(e) => userEdit(item.defid, item.id, "id")}
                                        >
                                            아이디 변경
                                        </button>
                                    </p>

                                    <p className="admin-text">
                                        비밀번호 : {item.pw}
                                        <button
                                            className="admin-button admin-button--tiny"
                                            onClick={(e) => userEdit(item.defid, item.pw, "pw")}
                                        >
                                            비밀번호 변경
                                        </button>
                                    </p>

                                    <p className="admin-text">
                                        보유포인트 : {item.point}
                                        <button
                                            className="admin-button admin-button--tiny"
                                            onClick={(e) => userEdit(item.defid, item.point, "point")}
                                        >
                                            포인트 수정
                                        </button>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default ManageUser
