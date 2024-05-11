

const sectionLinearBg = ({children,background}) => {
  return (
      <section className="" style={{ backgroundImage: `url('${background}')` }}>
          {children}
    </section>
  )
}

export default sectionLinearBg