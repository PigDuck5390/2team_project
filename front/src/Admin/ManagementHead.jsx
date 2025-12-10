import AdminHead from './AdminHead.jsx'
import { useLocation, useNavigate } from 'react-router-dom'

function ManagementHead() {
    const navigate = useNavigate()
    const { state: id } = useLocation()

    function movie() {
        navigate('/admin/management/movies', { state: id })
    }

    function reserv() {
        navigate('/admin/management/reserv', { state: id })
    }

    function event() {
        navigate('/admin/management/event', { state: id })
    }

    function benefit() {
        navigate('/admin/management/benefit', { state: id })
    }

    function user() {
        navigate('/admin/management/user', { state: id })
    }

    return (
        <div className="admin-management-header">
            <AdminHead />

            <div className="admin-management-toolbar">
                <span className="admin-admin-id">관리자 : {id}</span>

                <div className="admin-management-nav">
                    <button className="admin-nav-button" onClick={movie}>영화 정보 관리</button>
                    <button className="admin-nav-button" onClick={reserv}>예매내역 관리</button>
                    <button className="admin-nav-button" onClick={event}>이벤트 관리</button>
                    <button className="admin-nav-button" onClick={benefit}>혜택 관리</button>
                    <button className="admin-nav-button" onClick={user}>사용자 관리</button>
                </div>
            </div>
        </div>
    )
}

export default ManagementHead
