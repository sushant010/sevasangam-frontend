
import './tabs.css'
import $ from 'jquery'


const Tabs = () => {

    const handleChangeTab = (e) => {
        if (e.target.innerText === 'Donate once') {
            $('.donate-once').removeClass('d-none')
            $('.tab-item').removeClass('active')
            e.target.classList.add('active')
            $('.donate-monthly').addClass('d-none')
        } else {
            $('.donate-once').addClass('d-none')
            $('.tab-item').removeClass('active')
            e.target.classList.add('active')
            $('.donate-monthly').removeClass('d-none')
        }
    }


    return (
        <>
            <section className='mb-3 donation-tabs' style={{ padding: "1rem 3rem" }}>
                <div className='m-auto'>
                    <div onClick={handleChangeTab} className="d-flex tab align-items-center justify-content-center m-auto">
                        <div className='tab-item active'>
                            Donate once
                        </div>
                        <div className='tab-item'>
                            Donate Monthly
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Tabs