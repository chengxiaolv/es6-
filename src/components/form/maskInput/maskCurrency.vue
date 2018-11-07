<script>
import MaskedNumber from './maskedNumber'

export default {
    extends: MaskedNumber,
    props:{
        includeThousandsSeparator: {
            type: Boolean,
            default: true
        },
        allowDecimal: {
            type: Boolean,
            default: true
        }
    }
}
</script>