import * as React from 'react'
import { PropTypes } from 'prop-types'
import { View, TouchableOpacity, Text } from 'react-native'
import { isEqual } from 'lodash'
import { callIfFunction } from '../helpers'
import useSMSContext from '../context/useSMSContext'

const useRemoveAllChipProps = () => {
  const {
    selectedItems,
    showRemoveAll,
    colors,
    styles,
    removeAllText,
    _removeAllItems,
  } = useSMSContext()
  return {
    selectedItems,
    showRemoveAll,
    colors,
    styles,
    removeAllText,
    _removeAllItems,
  }
}

export const RemoveAllChip = React.memo(() => {
  const {
    selectedItems,
    showRemoveAll,
    colors,
    styles,
    removeAllText,
    _removeAllItems,
  } = useRemoveAllChipProps()

  console.log('getRemoveAllChipProps', useRemoveAllChipProps())

  return selectedItems && selectedItems.length > 1 && showRemoveAll ? (
    <View
      style={[
        {
          overflow: 'hidden',
          justifyContent: 'center',
          borderColor: colors.chip,
          flexDirection: 'row',
          alignItems: 'center',
          height: 28,
          borderWidth: 1,
          borderRadius: 20,
          paddingHorizontal: 10,
          margin: 4,
        },
        styles.chipContainer,
        styles.removeAllChipContainer,
      ]}
    >
      <TouchableOpacity
        onPress={() => _removeAllItems('chips-remove-all')}
        style={[
          {
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          },
          styles.chipTouchable,
          styles.removeAllChipTouchable,
        ]}
      >
        <Text
          style={[
            {
              color: colors.chip,
              fontSize: 13,
              marginRight: 0,
            },
            styles.chipText,
            styles.removeAllChipText,
          ]}
        >
          {removeAllText}
        </Text>
      </TouchableOpacity>
    </View>
  ) : null
})

export const Chips = ({ children }) => {
  // const { styles, colors } = state
  const {
    components,
    styles,
    colors,
    single,
    singleShowsChip,
    _removeAllItems,
    selectedItems,
    showRemoveAll,
    removeAllText,
    showChips,
  } = useSMSContext()
  const showIfSingle = single ? singleShowsChip : true
  return (
    children ||
    (selectedItems.length > 0 && showIfSingle && showChips ? (
      <View
        style={[
          {
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          },
          styles.chipsWrapper,
        ]}
      >
        <RemoveAllChip />
        {selectedItems &&
          selectedItems.length > 0 &&
          selectedItems.map(id => (
            <components.Chip key={id} id={id} selectedItems={selectedItems} />
          ))}
      </View>
    ) : null)
  )
}

const ChipWrapper = Comp => props => {
  const {
    components,
    items,
    styles: stylesFromContext,
    colors,
    displayKey,
    Icon,
    hideChipRemove,
    hideParentChips,
    iconNames,
    selectedItems,
    _toggleChildren,
    _toggleItem,
    getChildren,
    itemId,
    childItemId,
    _checkIsParent,
  } = useSMSContext()
  const { styles: stylesFromProps, id } = props
  const styles = {
    ...stylesFromContext,
    ...stylesFromProps,
  }
  // this is repeated because
  // the props (in find) weren't defined on first render
  const _findItem = id => find(id, items)
  const find = (id, items, isChild) => {
    if (!items) {
      return {}
    }
    
    const getFn = isChild ? childItemId : itemId
    console.log('isChild', isChild, getFn);
    let i = 0
    let found
    for (; i < items.length; i += 1) {
      console.log('id', id,  'getchildnre', getChildren(items[i]));

      if (getFn(items[i]) === id) {
        return items[i]
      } 
      else if (Array.isArray(getChildren(items[i]))) {
        found = find(id, getChildren(items[i]), true)
        if (found) {
          return found
        }
      }
    }
  }
  const item = React.useMemo(() => _findItem(id), [_findItem, id])
  if (!item) {
    return null
  }
  // check if item has children
  const isParent = React.useMemo(() => _checkIsParent(item), [
    _checkIsParent,
    item,
  ])
  // get the parent id if it's a child item
  // const parentItem = isParent ? undefined : findParent(item)
  const onPress = () => _toggleItem(item, 'chip')
  const hideChip = isParent && hideParentChips
  if (!item || !item[displayKey] || hideChip) return null
  return (
    <Comp
      onPress={onPress}
      styles={styles}
      colors={colors}
      displayKey={displayKey}
      Icon={Icon}
      isParent={isParent}
      ChipRemoveIcon={components.ChipRemoveIcon}
      hideChipRemove={hideChipRemove}
      hideParentChips={hideParentChips}
      iconNames={iconNames}
      item={item}
      selectedItems={selectedItems}
    />
  )
}

export const Chip = ChipWrapper(React.memo(
    (props) => {
      const {
        ChipRemoveIcon,
        styles,
        colors,
        displayKey,
        item,
        onPress,
        Icon,
        hideChipRemove,
        iconNames,
        isParent,
      } = props
      console.log('chip render', item)
      return (
      <View
          style={[
            {
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              height: 28,
              borderWidth: 1,
              borderRadius: 20,
              paddingLeft: 10,
              margin: 4,
              borderColor: colors.chip,
              paddingRight: hideChipRemove ? 10 : 0,
            },
            styles.chipContainer,
            isParent && styles.parentChipContainer,
          ]}
        >
          <Text
          numberOfLines={2}
          style={[
              {
                textAlignVertical: 'center',
                color: colors.chip,
                lineHeight: 13,
                fontSize: 13,
                marginRight: 0,
              },
              styles.chipText,
              isParent && styles.parentChipText,
            ]}
        >
          {item[displayKey]}
        </Text>
          {!hideChipRemove && (
        <TouchableOpacity
              onPress={onPress}
              style={{
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              <ChipRemoveIcon style={styles.chipIcon} />
            </TouchableOpacity>
          )}
        </View>
      )
    },
    (prevProps, nextProps) => {
      // return false;
      if (!isEqual(prevProps.styles, nextProps.styles)) {
        // console.log('should Re-render ', 'styles not equal', prevProps.selectedItems);
        return false
      }
      if (
        prevProps.selectedItems.includes(prevProps.id) &&
        nextProps.selectedItems.includes(prevProps.id)
      ) {
        // console.log('Chip shouldNotRerender ', 'item selected', prevProps.item);
        return true
      }
      if (
        !prevProps.selectedItems.includes(prevProps.id) &&
        !nextProps.selectedItems.includes(prevProps.id)
      ) {
        // console.log('Chip shouldNotRerender ', 'item not selected', prevProps.item);
        return true
      }
      return false
    },
  ),
)
Chip.propTypes = {
  styles: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}