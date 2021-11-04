/*
 * Copyright 2021 Michael Kraley
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import styles from "./Controls.module.css"
import {Picker, Item, Switch, View, ActionButton} from "@adobe/react-spectrum";
import {controlsInitialState, useControls, useControlSetter} from "./Main";
import FileChooser from "./FileChooser";
import ColorPicker from "./ColorPicker";
import {clearLogRecords, ControlValue, downloadAllLogRecords} from "./logging";
import styles from "./Controls.module.css"
import {useState} from "react";
import SimpleFileChooser from "./SimpleFileChooser";
import SliderControl from "./SliderControl";
import RecipeBox from "./RecipeBox";

const Controls = () => {
  const [showFullFileChooser, setShowFullFileChooser] = useState(false);
  const controls = useControls();
  const controlSetter = useControlSetter()
  const fonts = [
    'Arial', 'Georgia', 'Merriweather', 'OpenSans', 'Poppins', 'Roboto', 'SourceSerifPro', 'Times'
  ]
  const fontItems = fonts.map((item) => <Item key={item}>{item}</Item>);
  const resetAllControls = () => {
    for (const [controlName, value] of Object.entries(controlsInitialState)) {
      if (controlName === 'html') continue;
      controlSetter(controlName, 'resetAll', value as ControlValue)
    }
  }
  return (
    <div className={styles.Controls}>
      <div onDoubleClick={() => setShowFullFileChooser(true)}>
        {showFullFileChooser ?
          <FileChooser updateControlValue={controlSetter}/>
          :
          <SimpleFileChooser updateControlValue={controlSetter}/>
        }
      </div>
      <Picker label="Font name" selectedKey={controls.fontName} onSelectionChange={(val) => {
        controlSetter('fontName', 'picker', val)
      }} labelPosition="side">
        {fontItems}
      </Picker>

      <SliderControl controlName="fontSize" label={"Font size"} minValue={10} maxValue={64} step={1}/>
      <SliderControl controlName="lineHeight" label="Line height" minValue={1} maxValue={5} step={0.1}/>
      <SliderControl controlName="characterSpacing" label="Character spacing" minValue={-0.1} maxValue={4} step={0.1}/>
      <SliderControl controlName="wordSpacing" label="Word spacing" minValue={-0.2} maxValue={10} step={0.1}/>
      <SliderControl controlName="paragraphIndent" label="Paragraph indent" minValue={-0.5} maxValue={0.5} step={0.05}/>
      <SliderControl controlName="paragraphSpacing" label="Paragraph spacing" minValue={-1} maxValue={20} step={0.5}/>
      <Picker label="Text alignment" defaultSelectedKey={controls.textAlignment as string}
              onSelectionChange={(key) => {
                controlSetter('textAlignment', 'picker', key)
              }} labelPosition="side">
        <Item key="start">Left</Item>
        <Item key="end">Right</Item>
        <Item key="center">Center</Item>
        <Item key="justify">Justify</Item>
      </Picker>
      <SliderControl controlName="columnWidth" label="Column width" minValue={2} maxValue={8} step={0.2}/>
      <Switch isSelected={controls.darkMode} onChange={(val) => {
        controlSetter('darkMode', 'switch', val)
      }}>Dark mode</Switch>
      <ColorPicker label="Color theme" currentColor={{text: controls.foregroundColor, back: controls.backgroundColor}}
                   setColor={(newText: string, newBack: string) => {
                     controlSetter('foregroundColor', 'color', newText);
                     controlSetter('backgroundColor', 'color', newBack);
                   }} darkMode={controls.darkMode}/>
      <SliderControl controlName="backgroundSaturation" label="Contrast" minValue={0} maxValue={100} step={1}
                     isDisabled={controls.backgroundColor === '#FFFFFF'}/>
      <div><Switch isSelected={controls.showRuler} onChange={(val) => {
        controlSetter('showRuler', 'switch', val)
      }}>Show reading ruler</Switch>
        <Switch isSelected={controls.rulerUnderline} isHidden={!controls.showRuler} onChange={(val) => {
          controlSetter('rulerUnderline', 'switch', val)
        }}>Underline ruler</Switch></div>
      <View paddingStart="25px" isHidden={!controls.showRuler || controls.rulerUnderline} width="300px">
        <Switch isSelected={controls.rulerInvert} onChange={(val) => {
          controlSetter('rulerInvert', 'switch', val)
        }}>Invert ruler (gray-box)</Switch>
        <Switch isSelected={controls.rulerDisableMouse} onChange={(val) => {
          controlSetter('rulerDisableMouse', 'switch', val)
        }}>Disable mouse</Switch>
        <SliderControl controlName="rulerHeight" label="Ruler height" minValue={1} maxValue={10} step={0.1}/>
        <SliderControl controlName="rulerOpacity" label="Ruler opacity" minValue={0} maxValue={1} step={0.01}/>
        <SliderControl controlName="rulerTransitionHeight" label="Ruler fuzzy border" minValue={0} maxValue={10}
                       step={1}/>

      </View>
      <div className={styles.ButtonRow}>
        <ActionButton onPress={downloadAllLogRecords}>Download log</ActionButton>
        <ActionButton onPress={clearLogRecords} isHidden={true}>Clear log</ActionButton>
        <ActionButton onPress={resetAllControls}>Reset all controls</ActionButton>
      </div>
      <RecipeBox/>
    </div>
  )
}

export default Controls;