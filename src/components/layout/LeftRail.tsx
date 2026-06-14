// 1. Define the SVG components/paths for each tool
const GitHubIcon = () => (
  <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const PostgresIcon = () => (
  <svg className="w-6 h-6 fill-current text-[#336791]" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-1c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v1zm0-4c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v3zm5.5 4.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5v-7c0-.28.22-.5.5-.5h2c.28 0 .5.22.5.5v7z" />
  </svg>
);

const RedisIcon = () => (
  <svg className="w-6 h-6 fill-current text-[#D82C20]" viewBox="0 0 24 24">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const MongoIcon = () => (
  <svg className="w-6 h-6 fill-current text-[#439943]" viewBox="0 0 24 24">
    <path d="M12 2c-.3 0-.6.1-.9.4C10 3.5 7.5 8.3 7.5 12c0 3.9 2.1 7.2 4.1 9.7.2.2.4.3.4.3s.2-.1.4-.3c2-2.5 4.1-5.8 4.1-9.7 0-3.7-2.5-8.5-3.6-9.6-.3-.3-.6-.4-.9-.4zm0 2.5c.8 1.4 2.5 4.9 2.5 7.5 0 2.8-1.3 5.4-2.5 7.2-1.2-1.8-2.5-4.4-2.5-7.2 0-2.6 1.7-6.1 2.5-7.5z" />
  </svg>
);

const BoxIcon = () => (
  <svg
    className="w-6 h-6 stroke-current text-slate-400 fill-none"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-5.25v9"
    />
  </svg>
);

const KibanaIcon = () => (
  <svg className="w-6 h-6 fill-current text-[#FEC514]" viewBox="0 0 24 24">
    <path d="M21 3h-8v6h8V3zm-10 8H3v10h8V11zm10 0h-8v10h8V11zM11 3H3v6h8V3z" />
  </svg>
);

const ArchitectureIcon = () => (
  <svg
    className="w-6 h-6 stroke-current text-[#00A86B] fill-none"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4v4m0 0v4m0-4h4m-4 0H8m10 8h-4v4h4v-4zm-12 0H2v4h4v-4z"
    />
  </svg>
);

// 2. Map data configuration array
const items = [
  { id: "github", icon: <GitHubIcon />, isHeader: true },
  { id: "postgres", icon: <PostgresIcon /> },
  { id: "redis", icon: <RedisIcon /> },
  { id: "mongo", icon: <MongoIcon /> },
  { id: "box", icon: <BoxIcon /> },
  { id: "kibana", icon: <KibanaIcon /> },
  { id: "architecture", icon: <ArchitectureIcon /> },
];

// 3. Main component
const LeftRail = () => {
  return (
    <div className="flex flex-col items-center w-16 bg-black rounded-2xl overflow-hidden py-2 gap-1 border border-neutral-800 select-none absolute left-2 top-1/2 -translate-y-1/2">
      {items.map((item) => (
        <button
          key={item.id}
          className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer
            ${
              item.isHeader
                ? "bg-[#0d1b2a] hover:bg-[#1b263b] mb-2"
                : "hover:bg-neutral-900 active:scale-95"
            }`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};

export default LeftRail;
