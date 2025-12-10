import ManagementHead from './ManagementHead.jsx'

function Management() {
    return (
        <div className="admin-page admin-management-home">
            <ManagementHead />

            <main className="admin-main">
                <section className="admin-section admin-section--center">
                    <p className="admin-description">
                        왼쪽 상단 메뉴에서 관리할 항목을 선택해주세요.
                    </p>
                </section>
            </main>
        </div>
    )
}

export default Management
