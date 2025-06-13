export default function AdminSubmit(props: { posting?: boolean }) {
  return (
    <div className={"flex justify-around"}>
      <input type="password" name="admin" />
      {!props.posting ? (
        <button id="button">Add Beer</button>
      ) : (
        <button id="button" disabled>
          Add Beer
        </button>
      )}
    </div>
  );
}
