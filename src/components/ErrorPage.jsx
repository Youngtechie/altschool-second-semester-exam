import '../styles/errorPage.css'
import Back from './Back'
export default function Errorpage(){
    return (
        <section className="errorPage">
            <section className='error'><span>404</span> <span>error</span></section>

            <section className='pageE'>This page doesn't exist</section>

            <Back/>
        </section>
    )
}