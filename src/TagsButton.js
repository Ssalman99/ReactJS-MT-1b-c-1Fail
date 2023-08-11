import './App.css'

const TagsButton = props => {
  const {tags, tagsClicked, isActive} = props
  const {displayText, optionId} = tags

  const classButton = isActive ? 'highlated-button' : 'tags-button'

  const clikedtask = event => {
    tagsClicked(optionId)
    console.log(event.target.value)
  }

  return (
    <li className="item">
      <button
        type="button"
        value={optionId}
        className={`${classButton}`}
        onClick={clikedtask}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TagsButton
