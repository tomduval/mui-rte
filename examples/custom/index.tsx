import React, { FunctionComponent } from 'react'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import MUIRichTextEditor, { TAutocompleteItem } from '../../'

const save = (data: string) => {
    console.log(data)
}

type TStaff = {
    job: string
    name: string
    color: string
}

const Staff: FunctionComponent<TStaff> = (props) => {
    return (
        <>
            <ListItemAvatar>
                <Avatar style={{
                    backgroundColor: props.color
                }}>{props.name.substr(0, 1)}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={props.name}
                secondary={props.job}
            />
        </>
    )
}

const emojis: TAutocompleteItem[] = [
    {
        keys: ["face", "grin", ")"],
        value: "😀",
        content: "😀",
    },
    {
        keys: ["face", "beaming"],
        value: "😁",
        content: "😁",
    },
    {
        keys: ["face", "joy"],
        value: "😂",
        content: "😂",
    },
    {
        keys: ["face", "sweat"],
        value: "😅",
        content: "😅",
    }
]

const cities: TAutocompleteItem[] = [
    {
        keys: ["mexico"],
        value: "Mexico City",
        content: "Mexico City",
    },
    {
        keys: ["mexico", "beach"],
        value: "Cancun",
        content: "Cancun",
    },
    {
        keys: ["japan", "olympics"],
        value: "Tokyo",
        content: "Tokyo",
    },
    {
        keys: ["japan"],
        value: "Osaka",
        content: "Osaka",
    }
]

const staff = [
    {
        keys: ["all", "foo", "manager"],
        value: "Foo Bar",
        content: <Staff name="Foo Bar" job="Manager" color="tomato" />,
    },
    {
        keys: ["all", "bar", "support"],
        value: "Bar Foo",
        content: <Staff name="Bar Foo" job="Technical Support" color="orange" />,
    },
    {
        keys: ["all", "mui", "manager"],
        value: "Mui Rte",
        content: <Staff name="Mui Rte" job="Manager" color="dodgerblue" />,
    }
]

const StaffCallback = (searchTerm: string) => {
    return staff.filter(item => (item.keys.filter(key => key.includes(searchTerm)).length > 0)).splice(0, 2)
}

const Custom = () => {
    return (
        <MUIRichTextEditor
            label="Try typing ':grin' or '/mexico'..."
            onSave={save}
            inlineToolbar={true}
            toolbar={false}
            autocomplete={{
                strategies: [
                    {
                        type: "EMOJI",
                        items: emojis,
                        triggerChar: ":"
                    },
                    {
                        type: "CITY",
                        items: cities,
                        triggerChar: "/"
                    },
                    {
                        type: "USER",
                        items: staff,
                        itemsCallback: StaffCallback,
                        triggerChar: "@",
                        insertSpaceAfter: false,
                        keepTriggerChar: true
                    }
                ]
            }}
        />
    )
}

export default Custom
