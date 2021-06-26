import { MdDeleteForever,MdModeEdit } from 'react-icons/md'
import { getStringDate } from '../../utils/DateFormat'
const Note = ({_id,desc,day,date,onDeleteClick,onUpdateClick}) => {
    
    return (
        <div className="note" key={_id}>
        
    <span>
    <span>#Day{day}</span> 
    <hr/>
    {/* 100DaysOfCode, doubt, do you have to bold the text of 100 days of code, cause all them have bold, I did not know. */}
    {desc}
    </span>
    <div className="note-footer">
        <small>{getStringDate(date)}</small>
        <span>
        <MdModeEdit className="edit-icon" size="1.3em"
            onClick={onUpdateClick}
        />
        <MdDeleteForever className="delete-icon" size="1.3em"
            onClick={onDeleteClick}
        />
        </span>
        
    </div>
        </div>
    )
}
export default Note