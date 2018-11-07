import loanInvestJson from "@/assets/loanInvest"

export default function translate(loanInvestId){
	var _text = loanInvestJson.loanUse.find(t => t.id == loanInvestId)
	
	return _text ? _text.name : ""
}