import { useState, useEffect } from "react";
import styles from "./SearchBar.module.scss";
import Select from "react-select";
import { Folders } from "../../FakeFolderData/Data.json";

function SearchBar() {
    const customStyles = {
        placeholder: (provided) => ({
            ...provided,
            textAlign: "left",  // Ensure text is left-aligned
            width: "100%",      // Stretch across the full width
            marginLeft: "0px",  // Remove any left margin
            paddingLeft: "5px" // Optional: Add a slight left padding
        }),
        container: (provided) => ({
            ...provided,
            width: "600px", // Set a fixed width
        }),
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "var(--SecondaryColor)", 
            color: "var(--PrimaryTextColor)",
            "&:hover": {
                borderColor: "white",
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "var(--SecondaryColor)",
            color: "var(--PrimaryTextColor)",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: "var(--SecondaryColor)",
            color: "var(--PrimaryTextColor)",
            textAlign: "left",
            "&:hover": {
                backgroundColor: "var(--PrimaryColor)",
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "var(--PrimaryTextColor)",
        }),
        input: (provided) => ({
            ...provided,
            color: "var(--PrimaryTextColor)",
        }),
    };

    const [options, setOptions] = useState([]);
    let tmpOptions = [];
    function generateOptions(Folders, filePath="") {
        if (!Folders) return tmpOptions;
        console.log("Generating options for folders: ", Folders);
        Folders.forEach((folder)=>{
            tmpOptions.push({ value: folder.name, label: filePath + folder.name + "/" });
            if(folder.folders){
                generateOptions(folder.folders, filePath + folder.name + "/");
            }
            if(folder.files){
                folder.files.forEach((file)=>{
                    tmpOptions.push({ value: file.name, label: filePath + folder.name + "/" + file.name });
                })
            }
        })
            
        return tmpOptions;
    }

    function handleChange(){

    }

    
    useEffect(() => {
        const filePath = "";
        const genOptions = generateOptions(Folders, filePath);
        setOptions(genOptions);
        console.log("Options generated: ", genOptions);
    }, []);
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className={styles.searchBarCont}>
            <Select styles={customStyles} options={options} isSearchable={true} onChange={handleChange}/>
        </div>
    );
}

export default SearchBar;