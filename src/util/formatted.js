export default function formatted(language, data) {
    const mapDate = (date) => {
        const [year, month, day] = date.split('-').map(Number)
        return new Date(year, (month - 1), day)
    }

    return {
        id: Number(data.id),
        vehicles: new Intl
            .ListFormat(language, { style: "long", type: "conjunction"})
            .format(data.vehicles),
        kmTraveled: new Intl
            .NumberFormat(language, { style: "unit", unit: "kilometer"})
            .format(data.kmTraveled),
        from: new Intl
            .DateTimeFormat(language, { month: "long", day: "2-digit", year: "numeric"})
            .format(mapDate(data.from)),
        to: new Intl
            .DateTimeFormat(language, { month: "long", day: "2-digit", year: "numeric"})
            .format(mapDate(data.to))
    }
}