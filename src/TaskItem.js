import './App.css'

const TaskItem = props => {
  const {details} = props
  const {id, data, tag} = details
  return (
    <li className="task-list-item" key={id}>
      <p className="task-pera">{data}</p>

      <p className="highlated-pera">{tag}</p>
    </li>
  )
}

export default TaskItem
