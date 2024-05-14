import './sectionLinearBg.css'

const sectionLinearBg = ({children,background}) => {
  return (
      <section className="section-linear-bg" style={{ backgroundImage: `url('${background}')` }}>
          {children}
    </section>
  )
}

export default sectionLinearBg