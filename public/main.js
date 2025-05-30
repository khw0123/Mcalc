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
  McalcCompoundYtoY: function (A, r, t) {
    let R = 0.01 * r;
    let s = A * (1 + R) ** t;
    return s;
  },
  McalcCompoundYtoQ: function (A, r, t) {
    let R = 0.01 * r;
    let EAR = (1 + R) ** 4 - 1;
    let s = A * (1 + EAR) ** t;
    return s;
  },
  McalcCompoundYtoM: function (A, r, t) {
    let R = 0.01 * r;
    let EAR = (1 + R) ** 12 - 1;
    let s = A * (1 + EAR) ** t;
    return s;
  },
  McalcCompoundQtoY: function (A, r, t) {
    let R = 0.01 * r;
    let s = A * (1 + R / 4) ** t;
    return s;
  },
  McalcCompoundQtoQ: function (A, r, t) {
    let R = 0.01 * r;
    let s = A * (1 + R) ** t;
    return s;
  },
  McalcCompoundQtoM: function (A, r, t) {
    let R = 0.01 * r;
    let s = A * (1 + R * 3) ** t;
    return s;
  },
  McalcCompoundMtoY: function (A, r, t) {
    let R = 0.01 * r;
    let s = A * (1 + R / 12) ** t;
    return s;
  },
  McalcCompoundMtoM: function (A, r, t) {
    let R = 0.01 * r;
    let s = A * (1 + R) ** t;
    return s;
  },
  McalcCompoundMtoQ: function (A, r, t) {
    let R = 0.01 * r;
    let s = A * (1 + R / 3) ** t;
    return s;
  },
};

SubmitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const selectedInterestType = CalcForm.querySelector(
    ".interest-box #type"
  ).value;
  const selectedCompoundingPeriod = CalcForm.querySelector(
    "#compounding-period"
  ).value;

  const selectedUnitInput = CalcForm.querySelector(
    ".unit-box #unit-input"
  ).value;
  const selectedUnitStandard = CalcForm.querySelector(".unit-box #unit").value;
  const inputInterestRate = CalcForm.querySelector(
    ".interest-rate-box #interest-rate-input"
  ).value;
  const selectedInterestRateStandard = CalcForm.querySelector(
    ".interest-rate-box #interest-rate"
  ).value;
  const inputMoney = CalcForm.querySelector(".money-box #money").value;

  let resultType = "";
  let calcDuration = 0;

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
    calcDuration = Number(selectedUnitInput);
  } else if (selectedInterestType === "Compound") {
    let compoundingPeriodCode = "";
    if (selectedCompoundingPeriod === "Yearly") compoundingPeriodCode = "Y";
    else if (selectedCompoundingPeriod === "Quarterly")
      compoundingPeriodCode = "Q";
    else if (selectedCompoundingPeriod === "Monthly")
      compoundingPeriodCode = "M";

    if (!compoundingPeriodCode) {
      resultType = "fail";
    } else {
      resultType =
        "Compound" +
        compoundingPeriodCode +
        "to" +
        selectedInterestRateStandard;

      const inputDurationStandard = selectedUnitStandard;
      const targetDurationStandard = compoundingPeriodCode;

      let durationInInputUnit = Number(selectedUnitInput);

      if (targetDurationStandard === inputDurationStandard) {
        calcDuration = durationInInputUnit;
      } else if (
        targetDurationStandard === "Y" &&
        inputDurationStandard === "Q"
      ) {
        calcDuration = durationInInputUnit / 4;
      } else if (
        targetDurationStandard === "Y" &&
        inputDurationStandard === "M"
      ) {
        calcDuration = durationInInputUnit / 12;
      } else if (
        targetDurationStandard === "Q" &&
        inputDurationStandard === "Y"
      ) {
        calcDuration = durationInInputUnit * 4;
      } else if (
        targetDurationStandard === "Q" &&
        inputDurationStandard === "M"
      ) {
        calcDuration = durationInInputUnit / 3;
      } else if (
        targetDurationStandard === "M" &&
        inputDurationStandard === "Y"
      ) {
        calcDuration = durationInInputUnit * 12;
      } else if (
        targetDurationStandard === "M" &&
        inputDurationStandard === "Q"
      ) {
        calcDuration = durationInInputUnit * 3;
      } else {
        resultType = "fail";
      }
    }
  } else {
    resultType = "fail";
  }

  console.log("선택된 정보:", {
    InterestType: selectedInterestType,
    CompoundingPeriod: selectedCompoundingPeriod,
    UnitInput: selectedUnitInput,
    UnitStandard: selectedUnitStandard,
    InterestRateStandard: selectedInterestRateStandard,
    InterestRateInput: inputInterestRate,
    Money: inputMoney,
    ResultType: resultType,
    CalculatedDuration_for_CalcFunction: calcDuration,
  });

  let result;

  if (resultType && resultType !== "fail") {
    try {
      if (selectedInterestType === "Simple") {
        const functionName = "Mcalc" + resultType;
        if (McalcSimple[functionName]) {
          result = McalcSimple[functionName](
            Number(inputMoney),
            Number(inputInterestRate),
            calcDuration
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
            Number(inputInterestRate),
            calcDuration
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

      if (result !== undefined && !isNaN(result)) {
        console.log("계산 결과 (원리 합계):", result);

        const resultElement = document.querySelector(".result-text");
        const resultElement2 = document.querySelector(".result-text2");

        if (resultElement) {
          resultElement.textContent = "원리 합계: " + result.toFixed(0) + "원";
        } else {
          console.warn("결과를 표시할 .result-text 요소를 찾을 수 없습니다.");
        }

        const inputMoneyNumber = Number(inputMoney);
        const interestAmount = result - inputMoneyNumber;

        if (interestAmount !== undefined && !isNaN(interestAmount)) {
          if (resultElement2) {
            resultElement2.textContent =
              "총 이자: " + interestAmount.toFixed(0) + "원";
          } else {
            console.warn(
              "결과를 표시할 .result-text2 요소를 찾을 수 없습니다."
            );
          }
        } else {
          console.error(
            "Error: 이자 계산 결과가 유효하지 않습니다:",
            interestAmount
          );
          if (resultElement2) {
            resultElement2.textContent = "총 이자: 계산 불가";
          }
        }
      } else {
        console.error("Error: 계산 결과가 유효하지 않습니다:", result);
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
