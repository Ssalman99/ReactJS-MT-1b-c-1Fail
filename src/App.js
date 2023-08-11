import {Component} from 'react'
import {v4} from 'uuid'
import TagsButton from './TagsButton'
import TaskItem from './TaskItem'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    selectedTag: tagsList[0].optionId,
    input: '',
    tasksList: [],
    activeID: 'INITIAL',
  }

  changeInput = event => {
    this.setState({input: event.target.value})
  }

  changeTag = event => {
    console.log(event.target.value)
    this.setState({selectedTag: event.target.value})
  }

  addClicked = event => {
    event.preventDefault()

    const {selectedTag, input} = this.state

    const newList = {
      id: v4(),
      data: input,
      tag: selectedTag,
    }
    this.setState(Prev => ({
      tasksList: [...Prev.tasksList, newList],
      input: '',
      selectedTag: tagsList[0].optionId,
    }))
  }

  tagsClicked = id => {
    this.setState(prevState => ({
      activeID: prevState.activeID === id ? 'INITIAL' : id,
    }))
  }

  render() {
    const {activeID, tasksList, selectedTag, input} = this.state

    const filterTaskList =
      activeID === 'INITIAL'
        ? tasksList
        : tasksList.filter(
            each => each.tag.toLowerCase() === activeID.toLowerCase(),
          )

    return (
      <div className="app-container">
        <form onSubmit={this.addClicked} className="creat-task-container">
          <h1 className="task-heading">Create a task!</h1>
          <label className="label" htmlFor="inputText">
            Task
          </label>
          <input
            type="text"
            id="inputText"
            className="input"
            placeholder="Enter the task here"
            onChange={this.changeInput}
            value={input}
          />
          <label className="label" htmlFor="selectTag">
            Tags
          </label>
          <select
            value={selectedTag}
            id="selectTag"
            className="input"
            onChange={this.changeTag}
          >
            {tagsList.map(each => (
              <option value={each.optionId}>{each.displayText}</option>
            ))}
          </select>
          <div className="buuton-container">
            <button type="submit" className="button">
              Add Task
            </button>
          </div>
        </form>
        <div className="tags-container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="tags-button-container">
            {tagsList.map(each => (
              <TagsButton
                key={each.optionId}
                tags={each}
                tagsClicked={this.tagsClicked}
                isActive={each.optionId === activeID}
              />
            ))}
          </ul>
          <h1 className="tags-heading">Tasks</h1>

          <ul className="tasks-list-container">
            {tasksList.length === 0 ? (
              <p className="emty-list-line">No Tasks Added Yet</p>
            ) : (
              filterTaskList.map(each => (
                <TaskItem key={each.id} details={each} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
