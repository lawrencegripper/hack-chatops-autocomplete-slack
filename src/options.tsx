import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Options = () => {
  const [color, setColor] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [like, setLike] = useState<boolean>();
  const [chatopsHelp, setChatopsHelp] = useState<string>();

  useEffect(() => {
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    chrome.storage.local.get(
      {
        favoriteColor: "red",
        likesColor: true,
        chatopsHelp: ""
      },
      (items) => {
        setColor(items.favoriteColor);
        setLike(items.likesColor);
        setChatopsHelp(items.chatopsHelp);
      }
    );
  }, []);

  const saveOptions = () => {
    // Saves options to chrome.storage.local.
    chrome.storage.local.set(
      {
        favoriteColor: color,
        likesColor: like,
        chatopsHelp: chatopsHelp
      },
      () => {
        // Update status to let user know options were saved.
        setStatus("Options saved.");
        const id = setTimeout(() => {
          setStatus(undefined);
        }, 1000);
        return () => clearTimeout(id);
      }
    );
  };

  return (
    <>
      <div>
        Favorite color:&nbsp;
        <select
          value={color}
          onChange={(event) => setColor(event.target.value)}
        >
          <option value="red">red</option>
          <option value="green">green</option>
          <option value="blue">blue</option>
          <option value="yellow">yellow</option>
        </select>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={like}
            onChange={(event) => setLike(event.target.checked)}
          />
          I like colors.
        </label>
      </div>
      <div>
        <label>
          <textarea value={chatopsHelp} onChange={(e) => setChatopsHelp(e.target.value)}></textarea>
          Chatops help output
        </label>
      </div>
      <div>{status}</div>
      <button onClick={saveOptions}>Save</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
