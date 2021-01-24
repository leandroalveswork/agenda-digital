import './App.css';
import Header from './components/header/Header';
import Schedule from './components/header/Schedule';
import AddEventWindow from './components/header/AddEventWindow';
import { useState } from 'react';
import EraseAllWindow from './components/header/EraseAllWindow';
import defaultPostObj from './helpers/defaultPostObj';

export default function App() {

  const [addWindowOpen, setAddWindowOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [eventList, setEventList] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [postObject, setPostObject] = useState(defaultPostObj(1));
  const [nextId, setNextId] = useState(1);
  const [eraseWarnWindow, setEraseWarnWindow] = useState(false);

  const userInput = filterValue => {
    setFilterValue(filterValue)
    setFilteredEvents(eventList.filter(item => item.title.toLowerCase().indexOf(filterValue.toLowerCase()) > -1 ).map(item => {
      return {
        ...item,
        expanded: false,
        editMode: false,
        changes: {
          ...item
        }
      }
    }))
  }

  const handleAddWindow = (open) => {
    setAddWindowOpen(open)
    if (open) {
      setPostObject(defaultPostObj(nextId))
    }
  }

  const handleWarnWindow = (open) => setEraseWarnWindow(open)
  
  const wipeAll = () => {
    setEventList([])
    setFilteredEvents([])
    setEraseWarnWindow(false);
  }

  const handleDetails = (itemId, open) => {
    const filteredEventsCopy = Object.assign([], filteredEvents)
    const itemCopy = Object.assign({}, filteredEventsCopy.find(x => x.id === itemId))
    const { id, title, palestranteName, dateTime, local, details } = itemCopy
    itemCopy.expanded = open
    if (!open) {
      itemCopy.editMode = false
      itemCopy.changes = {
        id,
        title,
        palestranteName,
        dateTime,
        local,
        details
      }
    }
    filteredEventsCopy[filteredEventsCopy.findIndex(x => x.id === itemId)] = itemCopy
    setFilteredEvents(filteredEventsCopy)
  }

  const handleEditMode = (itemId, edit) => {
    const filteredEventsCopy = Object.assign([], filteredEvents)
    const itemCopy = Object.assign({}, filteredEventsCopy.find(x => x.id === itemId))
    const { id, title, palestranteName, dateTime, local, details } = itemCopy
    itemCopy.editMode = edit
    if (!edit) {
      itemCopy.changes = {
        id,
        title,
        palestranteName,
        dateTime,
        local,
        details
      }
    } else {
      if (!itemCopy.expanded) {
        itemCopy.expanded = true
      }
    }
    filteredEventsCopy[filteredEventsCopy.findIndex(x => x.id === itemId)] = itemCopy
    setFilteredEvents(filteredEventsCopy)
  }

  const handleSaveChanges = itemId => {
    let itemCopy = Object.assign({}, filteredEvents.find(x => x.id === itemId))
    const itemChangesCopy = Object.assign({}, itemCopy.changes)
    itemCopy = {
      ...itemChangesCopy,
      expanded: true,
      editMode: false,
      changes: {
        ...itemChangesCopy
      }
    }
    setEventList(eventList.map(item => item.id === itemId ? itemChangesCopy : item).sort((a, b) => a.dateTime - b.dateTime));
    if (itemChangesCopy.title.toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
      setFilteredEvents(filteredEvents.map(item => item.id === itemId ? itemCopy : item).sort((a, b) => a.dateTime - b.dateTime));
    } else {
      setFilteredEvents(filteredEvents.filter(item => item.id !== itemId))
    }
  }

  const handleDelete = itemId => {
    setEventList(eventList.filter(x => x.id !== itemId))
    setFilteredEvents(filteredEvents.filter(x => x.id !== itemId))
  }

  const handleNewChange = (itemId, inputName, val) => {
    const filteredEventsCopy = Object.assign([], filteredEvents)
    const itemCopy = Object.assign({}, filteredEventsCopy.find(x => x.id === itemId))
    itemCopy.changes[inputName] = inputName === 'dateTime' ? new Date(val) : val
    filteredEventsCopy[filteredEventsCopy.findIndex(x => x.id === itemId)] = itemCopy
    setFilteredEvents(filteredEventsCopy);
  }

  const handlePostEvent = () => {
    setEventList([...eventList, postObject].sort((a, b) => a.dateTime - b.dateTime));
    const filterPostObject = {
      ...postObject,
      expanded: false,
      editMode: false,
      changes: {
        ...postObject
      }
    }
    setFilteredEvents([...filteredEvents, filterPostObject].sort((a, b) => a.dateTime - b.dateTime))
    setNextId(nextId + 1)
    setAddWindowOpen(false)
  }

  const handleChangeInput = (inputName, val) => {
    const itemCopy = Object.assign({}, postObject)
    itemCopy[inputName] = inputName === 'dateTime' ? new Date(val) : val
    setPostObject(itemCopy)
  }

  return (
    <div>
      <Header filterVal={filterValue} onFilterChange={userInput}/>
      <Schedule
        onClickNew={handleAddWindow}
        onHandleDetails={handleDetails}
        onClickWipeAll={handleWarnWindow}
        onHandleEdit={handleEditMode}
        onHandleSaveChanges={handleSaveChanges}
        onHandleDelete={handleDelete}
        onHandleChangeInput={handleNewChange}>
          {filteredEvents}
      </Schedule>
      {addWindowOpen && <AddEventWindow
        onClickClose={handleAddWindow}
        onPostEvent={handlePostEvent}
        onChangeInput={handleChangeInput}>
          {postObject}
      </AddEventWindow>}
      {eraseWarnWindow && <EraseAllWindow onClickClose={handleWarnWindow} onClickContinue={wipeAll} />}
    </div>
  );
}
