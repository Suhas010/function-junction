import React, { PureComponent } from 'react';
import { Input, Icon, Tooltip } from 'antd';
export class ShowTeam extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }
  toggleEditing = () => {
    this.setState(state => {
      return {
        isEditing: !state.isEditing
      };
    });
  };

  handleTeamChange = (event, field) => {
    event.preventDefault();
    this.toggleEditing();
    this.props.handleTeamChange(event.target.value.trim(), field);
  };
  handleShowcasableURLChange = event => {
    event.preventDefault();
    this.toggleEditing();
    this.props.handleShowcasableURLChange(event.target.value);
  };
  render() {
    const { isEditing } = this.state;
    const { team, isShowcasable, isPastEvent } = this.props;
    return (
      <>
        {!isEditing ? (
          <>
            <div className='flex-center'>
              <h4 className='team-name'>
                <Icon type='team' style={{ marginRight: '0.5rem' }} />
                {team.name}
              </h4>
              {!isPastEvent && (
                <h4 style={{ marginLeft: "auto" }}>
                  <Tooltip title="Edit Team">
                    <Icon
                      theme='twoTone'
                      onClick={this.toggleEditing}
                      type='edit'
                    />
                  </Tooltip>
                  <Tooltip title='Delete Team'>
                    <Icon
                      theme='twoTone'
                      onClick={this.props.handleDeleteTeam}
                      type='delete'
                      style={{ marginLeft: '0.5rem' }}
                    />
                  </Tooltip>
                </h4>
              )}
            </div>
            {team.showcase_url && (
              <div className="showcasable-url">
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={`${team.showcase_url}`}
              >
                {team.showcase_url}
              </a>
            </div>
            )}
            </>
        ) : (
          <>
            <Icon
              className='close-circle'
              onClick={this.toggleEditing}
              theme='twoTone'
              type='close-circle'
            />
            <Input
              defaultValue={team.name}
              onBlur={event => this.handleTeamChange(event, "name")}
              placeholder="Enter team name"
              name="name"
              disabled={isPastEvent}
            />
            <Input
              className='showcasable-url'
              placeholder='Enter showcaseable URL'
              defaultValue={team.showcase_url}
              onBlur={event => this.handleTeamChange(event, "showcase_url")}
              name="showcase_url"
              disabled={isPastEvent}
            />
          </>
        )}
      </>
    );
  }
}
