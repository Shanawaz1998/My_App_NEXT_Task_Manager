import styles from "./show-task.module.css";

function Tasks({ item }) {
  return (
    <div className="mt-10">
      <div className="grid grid-cols-12">
        <div className="col-span-6 col-start-4">
          <div className={styles.singleTaskContainer}>{item.title}</div>
        </div>
      </div>
    </div>
  );
}
export default Tasks;
