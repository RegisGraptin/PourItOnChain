     export default function CardDefault() {
    return (
      <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
      <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
        <img src="" alt="card-image" />
      </div>
      <div className="p-4">
        <h6 className="mb-2 text-slate-800 text-xl font-semibold">
          Website Review Check
        </h6>
        <p className="text-slate-600 leading-normal font-light">
          The place is close to Barceloneta Beach and bus stop just 2 min by walk
          and near to &quot;Naviglio&quot; where you can enjoy the main night life in
          Barcelona.
        </p>
      </div>
      <div className="px-4 pb-4 pt-0 mt-2">
        <button className="rounded-md bg-slate-800 items-center py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
          Read more
        </button>
      </div>
    </div>  
    );
  }