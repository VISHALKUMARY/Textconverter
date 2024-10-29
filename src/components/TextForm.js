import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import 'font-awesome/css/font-awesome.min.css';



export default function TextForm(props) {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("es");
  const [translatedText, setTranslatedText] = useState("");

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase!", "success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lowercase!", "success");
  };

  const handleClearClick = () => {
    setText("");
    props.showAlert("Cleared!", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleCoClick = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => props.showAlert("Copied to clipboard!", "success"))
        .catch((error) => console.error("Failed to copy text:", error));
    } else {
      
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed"; 
      textArea.style.opacity = "0";  
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand("copy");
        props.showAlert("Copied to clipboard!", "success");
      } catch (error) {
        console.error("Failed to copy text:", error);
        props.showAlert("Failed to copy!", "danger");
      }
      
      document.body.removeChild(textArea);
    }
  };
  

  const handleExtraSpace = () => {
    let newText = text.split(/[ ]+/).join(" ");
    setText(newText);
    props.showAlert("Extra Spaces Removed!", "success");
  };

  const downloadImage = () => {
    const textArea = document.getElementById("myBox");
    html2canvas(textArea).then((canvas) => {
      const link = document.createElement("a");
      link.download = "text-image.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(text, 10, 10);
    doc.save("text.pdf");
  };

  const translateText = async () => {
    try {
      const response = await axios.get(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=en|${language}`
      );
      setTranslatedText(response.data.responseData.translatedText);
      props.showAlert(`Translation Successful!`, "success");
    } catch (error) {
      console.error("Error translating text:", error);
      props.showAlert("Translation Failed!", "danger");
    }
  };

  // New function for speech synthesis
  const handleSpeak = () => {
    if (text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === "es" ? "es-ES" : "en-US"; // Set language based on selection
      window.speechSynthesis.speak(utterance);
      props.showAlert("Speaking Text!", "success");
    } else {
      props.showAlert("Nothing to speak!", "warning");
    }
  };

  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "dark" ? "#1326" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
         {/* Uppercase Button */}
<button
  disabled={text.length === 0}
  className="btn btn-info mx-2 my-2"
  onClick={handleUpClick}
>
  <i className="fa fa-arrow-up" aria-hidden="true"></i>  Uppercase
</button>

{/* Lowercase Button */}
<button
  disabled={text.length === 0}
  className="btn btn-info mx-2 my-2"
  onClick={handleLoClick}
>
  <i className="fa fa-arrow-down" aria-hidden="true"></i>  Lowercase
</button>



{/* Remove Extra Button */}
<button
  disabled={text.length === 0}
  className="btn btn-info mx-2 my-2"
  onClick={handleExtraSpace}
>
  <i className="fa fa-cut" aria-hidden="true"></i> Remove Extra Space
</button>

{/* Image Button */}
<button
  disabled={text.length === 0}
  className="btn btn-success mx-2 my-2"
  onClick={downloadImage}
>
  <i className="fa fa-file-image" aria-hidden="true"></i> Download Image
</button>

{/* PDF Button */}
<button
  disabled={text.length === 0}
  className="btn btn-primary mx-2 my-2"
  onClick={downloadPDF}
>
  <i className="fa fa-file-pdf" aria-hidden="true"></i> Download PDF
</button>
{/* Clear Button */}
<button
  disabled={text.length === 0}
  className="btn btn-danger mx-2 my-2"
  onClick={handleClearClick}
>
  <i className="fa fa-trash" aria-hidden="true"></i> 
</button>

{/* Copy Button */}
<button
  disabled={text.length === 0}
  class="btn btn-secondary"
  onClick={handleCoClick}
>
  <i className="fa fa-copy" aria-hidden="true"></i>
</button>

{/* Speak Button */}
<button
          disabled={text.length === 0}
          className="btn btn-warning mx-2 my-2"
          onClick={handleSpeak}
        >
          <i className="fa fa-volume-up" aria-hidden="true"></i> 
        </button>

        {/* Language Selection */}
        <div className="my-3 mx-2">
          <label htmlFor="languageSelect">
            <strong>Select Language :</strong>
          </label>{" "}
          <br />
          <select
            id="languageSelect"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {/* Add language options */}
            <option value="af">Afrikaans</option>
            <option value="sq">Albanian</option>
            <option value="ar">Arabic</option>
            <option value="hy">Armenian</option>
            <option value="bn">Bengali</option>
            <option value="bs">Bosnian</option>
            <option value="ca">Catalan</option>
            <option value="hr">Croatian</option>
            <option value="cs">Czech</option>
            <option value="da">Danish</option>
            <option value="nl">Dutch</option>
            <option value="en">English</option>
            <option value="eo">Esperanto</option>
            <option value="et">Estonian</option>
            <option value="tl">Filipino</option>
            <option value="fi">Finnish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="el">Greek</option>
            <option value="gu">Gujarati</option>
            <option value="ht">Haitian Creole</option>
            <option value="ha">Hausa</option>
            <option value="he">Hebrew</option>
            <option value="hi">Hindi</option>
            <option value="hu">Hungarian</option>
            <option value="is">Icelandic</option>
            <option value="ig">Igbo</option>
            <option value="id">Indonesian</option>
            <option value="ga">Irish</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="jw">Javanese</option>
            <option value="kn">Kannada</option>
            <option value="kk">Kazakh</option>
            <option value="km">Khmer</option>
            <option value="ko">Korean</option>
            <option value="ku">Kurdish</option>
            <option value="ky">Kyrgyz</option>
            <option value="lo">Lao</option>
            <option value="la">Latin</option>
            <option value="lv">Latvian</option>
            <option value="lt">Lithuanian</option>
            <option value="lu">Luxembourgish</option>
            <option value="mk">Macedonian</option>
            <option value="ml">Malayalam</option>
            <option value="mn">Mongolian</option>
            <option value="my">Myanmar (Burmese)</option>
            <option value="ne">Nepali</option>
            <option value="no">Norwegian</option>
            <option value="ny">Nyanja</option>
            <option value="or">Odia</option>
            <option value="pl">Polish</option>
            <option value="pt">Portuguese</option>
            <option value="pa">Punjabi</option>
            <option value="ro">Romanian</option>
            <option value="ru">Russian</option>
            <option value="sr">Serbian</option>
            <option value="si">Sinhalese</option>
            <option value="sk">Slovak</option>
            <option value="sl">Slovenian</option>
            <option value="es">Spanish</option>
            <option value="su">Sundanese</option>
            <option value="sw">Swahili</option>
            <option value="sv">Swedish</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="th">Thai</option>
            <option value="tr">Turkish</option>
            <option value="uk">Ukrainian</option>
            <option value="ur">Urdu</option>
            <option value="vi">Vietnamese</option>
            <option value="cy">Welsh</option>
            <option value="xh">Xhosa</option>
            <option value="yi">Yiddish</option>
            <option value="zu">Zulu</option>
            {/* Add more languages as needed */}
          </select>
          <button className="btn btn-warning mx-2 my-2" onClick={translateText}>
            Translate
          </button>
        </div>
      </div>

      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1>Your Text Summary</h1>
        <p>
        <strong> {text.split(/\s+/).filter((element) => element.length !== 0).length}{" "}</strong>
          words and <strong>{text.length}</strong> characters   and <strong>{0.08 *
            text.split(" ").filter((element) => element.length !== 0)
              .length}{" "}</strong>
          Minutes Read
        
          
        </p>

        {translatedText && (
          <div>
            <h2>Translated Text</h2>
            <p>{translatedText}</p>
          </div>
        )}
      </div>
    </>
  );
}
