export default function Card({ src, className = '', styles = {}, onClick }) {
  return (
    <img
      src={src}
      className={'card ' + className}
      style={styles}
      alt=""
      onClick={onClick}
    />
  )
}
