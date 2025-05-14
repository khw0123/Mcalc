const CalcForm = document.querySelector("#start-calc");
let InterestType = CalcForm.querySelector(".interest-box #type");
let UnitInput = CalcForm.querySelector(".unit-box #unit-input");
let UnitStandard = CalcForm.querySelector(".unit-box #unit");
let InterestRateInput = CalcForm.querySelector(
  ".interest-rate-box #interest-rate-input"
);
let InterestRateStandard = CalcForm.querySelector(
  ".interest-rate-box #interest-rate"
);
let Money = CalcForm.querySelector(".money-box #money");
let resultType = "";
const SubmitBtn = CalcForm.querySelector(".submit");

const McalcSimple = {
  McalcSimpleBasic: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + R * n);
    return s;
  },
  McalcSimpleYtoQ: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + R * 4 * n);
    return s;
  },
  McalcSimpleYtoM: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + R * 12 * n);
    return s;
  },
  McalcSimpleQtoY: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + (R / 4) * n);
    return s;
  },
  McalcSimpleQtoM: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + R * 3 * n);
    return s;
  },
  McalcSimpleMtoY: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + (R / 12) * n);
    return s;
  },
  McalcSimpleMtoQ: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + (R / 3) * n);
    return s;
  },
};

const McalcCompound = {
  McalcCompoundYtoY: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + R) ** n;
    return s;
  },
  McalcCompoundYtoQ: function (A, r, n) {
    let R = 0.01 * r;
    let EAR = (1 + R) ** 4 - 1;
    let s = A * (1 + EAR) ** n;
    return s;
  },
  McalcCompoundYtoM: function (A, r, n) {
    let R = 0.01 * r;
    let EAR = (1 + R) ** 12 - 1;
    let s = A * (1 + EAR) ** n;
    return s;
  },
  McalcCompoundQtoY: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + R / 4) ** (4 * n);
    return s;
  },
  McalcCompoundQtoQ: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + R) ** n;
    return s;
  },
  McalcCompoundQtoM: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + R * 3) ** n;
    return s;
  },
  McalcCompoundMtoY: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + R / 12) ** (12 * n);
    return s;
  },
  McalcCompoundMtoM: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + R) ** n;
    return s;
  },
  McalcCompoundMtoQ: function (A, r, n) {
    let R = 0.01 * r;
    let s = A * (1 + R / 3) ** n;
    return s;
  },
};

SubmitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const selectedInterestType = CalcForm.querySelector(
    ".interest-box #type"
  ).value;
  const selectedUnitInput = CalcForm.querySelector(
    ".unit-box #unit-input"
  ).value;
  const selectedUnitStandard = CalcForm.querySelector(".unit-box #unit").value;
  const selectedInterestRateInput = CalcForm.querySelector(
    ".interest-rate-box #interest-rate-input"
  ).value;
  const selectedInterestRateStandard = CalcForm.querySelector(
    ".interest-rate-box #interest-rate"
  ).value;
  const inputMoney = CalcForm.querySelector(".money-box #money").value;
  resultType = "";
  if (selectedInterestType === "Simple") {
    if (selectedUnitStandard === "Y") {
      if (selectedInterestRateStandard === "Y") {
        resultType = "SimpleBasic";
      } else if (selectedInterestRateStandard === "Q") {
        resultType = "SimpleYtoQ";
      } else if (selectedInterestRateStandard === "M") {
        resultType = "SimpleYtoM";
      }
    } else if (selectedUnitStandard === "Q") {
      if (selectedInterestRateStandard === "Y") {
        resultType = "SimpleQtoY";
      } else if (selectedInterestRateStandard === "Q") {
        resultType = "SimpleBasic";
      } else if (selectedInterestRateStandard === "M") {
        resultType = "SimpleQtoM";
      }
    } else if (selectedUnitStandard === "M") {
      if (selectedInterestRateStandard === "Y") {
        resultType = "SimpleMtoY";
      } else if (selectedInterestRateStandard === "Q") {
        resultType = "SimpleMtoQ";
      } else if (selectedInterestRateStandard === "M") {
        resultType = "SimpleBasic";
      }
    }
  } else if (selectedInterestType === "Compound") {
    if (selectedUnitStandard === "Y") {
      if (selectedInterestRateStandard === "Y") {
        resultType = "CompoundYtoY";
      } else if (selectedInterestRateStandard === "Q") {
        resultType = "CompoundYtoQ";
      } else if (selectedInterestRateStandard === "M") {
        resultType = "CompoundYtoM";
      } else {
        resultType = "fail"; // Y 기간에 Q, M 아닌 다른 이율 단위가 있다면 fail
      }
    } else if (selectedUnitStandard === "Q") {
      if (selectedInterestRateStandard === "Y") {
        resultType = "CompoundQtoY";
      } else if (selectedInterestRateStandard === "Q") {
        resultType = "CompoundQtoQ";
      } else if (selectedInterestRateStandard === "M") {
        resultType = "CompoundQtoM";
      } else {
        resultType = "fail"; // Q 기간에 Y, Q, M 아닌 다른 이율 단위가 있다면 fail
      }
    } else if (selectedUnitStandard === "M") {
      if (selectedInterestRateStandard === "Y") {
        resultType = "CompoundMtoY";
      } else if (selectedInterestRateStandard === "M") {
        resultType = "CompoundMtoM";
      } else if (selectedInterestRateStandard === "Q") {
        resultType = "CompoundMtoQ";
      } else {
        resultType = "fail"; // M 기간에 Y, Q, M 아닌 다른 이율 단위가 있다면 fail
      }
    } else {
      resultType = "fail"; // Y, Q, M 아닌 다른 기간 단위가 있다면 fail
    }
  } else {
    // Simple, Compound 아닌 다른 InterestType
    resultType = "fail";
  }
  console.log("선택된 정보:", {
    InterestType: selectedInterestType,
    UnitInput: selectedUnitInput,
    UnitStandard: selectedUnitStandard,
    InterestRateStandard: selectedInterestRateStandard,
    InterestRateInput: selectedInterestRateInput,
    Money: inputMoney,
    ResultType: resultType,
  });

  let result;

  if (resultType && resultType !== "fail") {
    try {
      if (selectedInterestType === "Simple") {
        const functionName = "Mcalc" + resultType; // SimpleBasic 오타 수정했으니 그냥 resultType 사용
        if (McalcSimple[functionName]) {
          result = McalcSimple[functionName](
            Number(inputMoney),
            Number(selectedInterestRateInput),
            Number(selectedUnitInput)
          );
        } else {
          console.error(
            "Error: 해당하는 Simple 계산 함수를 찾을 수 없습니다:",
            functionName
          );
          alert("계산 중 내부 오류가 발생했습니다. (Simple)");
          return;
        }
      } else if (selectedInterestType === "Compound") {
        const functionName = "Mcalc" + resultType;
        if (McalcCompound[functionName]) {
          result = McalcCompound[functionName](
            Number(inputMoney),
            Number(selectedInterestRateInput),
            Number(selectedUnitInput)
          );
        } else {
          console.error(
            "Error: 해당하는 Compound 계산 함수를 찾을 수 없습니다:",
            functionName
          );
          alert("계산 중 내부 오류가 발생했습니다. (Compound)");
          return;
        }
      }

      if (result !== undefined) {
        console.log("계산 결과:", result);
        const resultElement = document.querySelector(".result-text");
        const resultElement2 = document.querySelector(".result-text2");
        if (resultElement) {
          resultElement.textContent = "원리 합계: " + result.toFixed(0) + "원";
        }
        if (resultElement2) {
          resultElement2.textContent =
            "이자: " + (result.toFixed(0) - inputMoney) + "원";
        }
      } else {
        console.error("Error: 계산 결과가 유효하지 않습니다.");
        alert("계산 처리 중 예상치 못한 오류가 발생했습니다.");
      }
    } catch (e) {
      console.error("계산 중 예외 발생:", e);
      alert("계산 처리 중 오류가 발생했습니다.");
    }
  } else {
    alert("지원하지 않는 계산 방식입니다.");
  }
});
