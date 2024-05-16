const StorePage = ({ params: { id } }) => {
  console.log(id);
  return (
    <p className="text-2xl">
      Showing the store page for the name <strong>{id}</strong>
    </p>
  );
};

export default StorePage;
