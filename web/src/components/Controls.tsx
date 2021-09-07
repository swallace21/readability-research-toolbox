// import styles from "./Controls.module.css"
import {Picker, Item, Switch, View, ActionButton} from "@adobe/react-spectrum";
import {useControls} from "./Main";
import FileChooser from "./FileChooser";
import ColorPicker from "./ColorPicker";
import {clearLogRecords, downloadAllLogRecords} from "./logging";
import styles from "./Controls.module.css"
import {useState} from "react";
import SimpleFileChooser from "./SimpleFileChooser";
import SliderControl from "./SliderControl";

const Controls = (props: {
  updateControlValue: (name: string, value: boolean | number | string) => void
}) => {
  const [showFullFileChooser, setShowFullFileChooser] = useState(false);
  const controls = useControls();
  const fonts = [
    'Arial', 'Georgia', 'Merriweather', 'OpenSans', 'Poppins', 'Roboto', 'SourceSerifPro', 'Times'
  ]
  const fontItems = fonts.map((item) => <Item key={item}>{item}</Item>);
  return (
    <div className={styles.Controls}>
      <div onDoubleClick={() => setShowFullFileChooser(true)}>
        {showFullFileChooser ?
          <FileChooser updateControlValue={props.updateControlValue}/>
          :
          <SimpleFileChooser updateControlValue={props.updateControlValue}/>
        }
      </div>
      <Picker label="Font name" selectedKey={controls.fontName} onSelectionChange={(val) => {
        props.updateControlValue('fontName', val)
      }} labelPosition="side">
        {fontItems}
      </Picker>

      <SliderControl controlName="fontSize" label={"Font size"} minValue={10} maxValue={64} step={1} />
      <SliderControl controlName="lineHeight" label="Line height" minValue={1} maxValue={5} step={0.1} />
      <SliderControl controlName="characterSpacing" label="Character spacing" minValue={-1} maxValue={4} step={0.1}/>
      <SliderControl controlName="wordSpacing" label="Word spacing" minValue={-1} maxValue={10} step={0.1}/>
      <SliderControl controlName="paragraphIndent" label="Paragraph indent" minValue={-0.5} maxValue={0.5} step={0.05}/>
      <SliderControl controlName="paragraphSpacing" label="Paragraph spacing" minValue={-1} maxValue={20} step={0.5}/>
      <Picker label="Text alignment" defaultSelectedKey={controls.textAlignment as string}
              onSelectionChange={(key) => {
                props.updateControlValue('textAlignment', key)
              }} labelPosition="side">
        <Item key="start">Left</Item>
        <Item key="end">Right</Item>
        <Item key="center">Center</Item>
        <Item key="justify">Justify</Item>
      </Picker>
      <SliderControl controlName="columnWidth" label="Column width" minValue={2} maxValue={8} step={0.2}/>
      <Switch isSelected={controls.darkMode} onChange={(val) => {
        props.updateControlValue('darkMode', val)
      }}>Dark mode</Switch>
      <ColorPicker label="Color theme" currentColor={{text: controls.foregroundColor, back: controls.backgroundColor}}
                   setColor={(newText: string, newBack: string) => {
                     props.updateControlValue('foregroundColor', newText);
                     props.updateControlValue('backgroundColor', newBack);
                   }} darkMode={controls.darkMode}/>
      <SliderControl controlName="backgroundSaturation" label="Contrast" minValue={0} maxValue={100} step={1}
                     isDisabled={controls.backgroundColor === '#FFFFFF'}/>
      <div><Switch isSelected={controls.showRuler} onChange={(val) => {
        props.updateControlValue('showRuler', val)
      }}>Show reading ruler</Switch>
        <Switch isSelected={controls.rulerUnderline} isHidden={!controls.showRuler} onChange={(val) => {
          props.updateControlValue('rulerUnderline', val)
        }}>Underline ruler</Switch></div>
      <View paddingStart="25px" isHidden={!controls.showRuler || controls.rulerUnderline} width="300px">
        <Switch isSelected={controls.rulerInvert} onChange={(val) => {
          props.updateControlValue('rulerInvert', val)
        }}>Invert ruler (gray-box)</Switch>
        <Switch isSelected={controls.rulerDisableMouse} onChange={(val) => {
          props.updateControlValue('rulerDisableMouse', val)
        }}>Disable mouse</Switch>
        <SliderControl controlName="rulerHeight" label="Ruler height" minValue={1} maxValue={10} step={0.1}/>
        <SliderControl controlName="rulerOpacity" label="Ruler opacity"  minValue={0} maxValue={1} step={0.01}/>
        <SliderControl controlName="rulerTransitionHeight" label="Ruler fuzzy border" minValue={0} maxValue={10} step={1}/>

      </View>
      <div className={styles.ButtonRow}>
        <ActionButton onPress={downloadAllLogRecords}>Download log</ActionButton>
        <ActionButton onPress={clearLogRecords} isHidden={true}>Clear log</ActionButton>
        <ActionButton onPress={() => props.updateControlValue('reset', 0)}>Reset controls</ActionButton>
      </div>
    </div>
  )
}

export default Controls;
