import React, { useState, useRef, useEffect } from 'react';

const MultiSelectCheckbox = ({
  options,
  value = [],
  onChange,
  placeholder = "Select...",
  name
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (optionValue) => {
    const option = options.find(opt => opt.value === optionValue);
    const isSelected = value.includes(optionValue);
    
    let newSelectedOptions;
    if (isSelected) {
      newSelectedOptions = value.filter(v => v !== optionValue);
    } else {
      newSelectedOptions = [...value, optionValue];
    }

    // Convert to the format your handleSelectChange expects
    const selectedOptions = options.filter(opt => newSelectedOptions.includes(opt.value));
    onChange(name, selectedOptions);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        width: "100%",
        fontSize: "12px",
      }}
    >
      <div
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={toggleDropdown}
      >
        <span style={{ color: value.length ? "#000" : "#999" }}>
          {value.length ? `${value.length} selected` : placeholder}
        </span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            maxHeight: "200px",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#fff",
            zIndex: 1000,
            marginTop: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              style={{
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor: value.includes(option.value)
                  ? "#f5f5f5"
                  : "transparent",
                ":hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleOption(option.value);
              }}
            >
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => toggleOption(option.value)}
                onClick={(e) => e.stopPropagation()}
                style={{
                  marginRight: "8px",
                  cursor: "pointer",
                }}
              />
              <div>
                <div>{option.label}</div>
                {option.description && (
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#666",
                      marginTop: "2px",
                    }}
                  >
                    {option.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectCheckbox