"use client";
import styles from "./show-task.module.css";

function Tasks({ item, handleDelete }) {
  console.log("test", handleDelete);
  return (
    <div className="mt-10">
      <div className="grid grid-cols-12">
        <div className="col-span-6 col-start-4">
          <div className={styles.singleTaskContainer}>
            {item.title}
            <button onClick={handleDelete} className="float-right">
              <span>Delete</span>
            </button>

            <p>{item.shortDesc}</p>
            <p>{item.createdAt.substring(0, 10)}</p>
            <p>{item.updatedAt.substring(0, 10)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Tasks;
