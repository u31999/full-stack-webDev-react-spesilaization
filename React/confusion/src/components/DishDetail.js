import React, {Component} from "react";
import { Card, CardImg, CardText, CardBody, CardTitle,
    Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from 'react-animation-components'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormOpen : false
        }

        this.openSubmitForm = this.openSubmitForm.bind(this);
        this.toggleSubmitForm = this.toggleSubmitForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(values) {
        this.setState({
            isFormOpen: false
        })
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
    }
    toggleSubmitForm() {
        this.setState({
            isFormOpen: !this.state.isFormOpen
        })
    }
    openSubmitForm() {
        this.setState({
            isFormOpen: true
        })
    }
    render(){
        return(
            <div>
            <Modal isOpen={this.state.isFormOpen} toggle={this.toggleSubmitForm}>
                <ModalHeader toggle={this.toggleSubmitForm}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                    <FormGroup>
                        <Label for='rating'>Rating</Label>
                        <Control.select model='.rating' name="rating" className="form-control" value='1'>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </Control.select>
                        </FormGroup>
                        <FormGroup>
                        <Label for='author'>Your Name</Label>
                        <Control.text model='.author' name="author" className="form-control" 
                        validators={{required, minLength: minLength(3), maxLength: maxLength(16)}}
                         placeholder="Your Name"></Control.text>
                         <Errors show='touched' className="text-danger" model='.author' messages={{
                             required: 'required',
                             minLength: 'must be greater than 2 character',
                             maxLength: 'must be less than 16 character'
                         }}></Errors>
                         </FormGroup>
                         <FormGroup>
                        <Label for='comment'>Comment</Label>
                        <Control.textarea model='.comment' name='comment' className="form-control" rows='6'
                            validators={{required}}></Control.textarea>
                            <Errors show='touched' className="text-danger" model='.comment' messages={{required: 'Your comment is required'}}></Errors>
                        </FormGroup>
                        <FormGroup>
                             <Button type='submit' color='primary'>Submit</Button>
                        </FormGroup>
                    </LocalForm>
                </ModalBody>
            </Modal>
                <Button className='btn-outline-secondary' onClick={this.openSubmitForm}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
            </div>
        )
    }
} 

const RenderDish = ({dish}) => {
    return(
        <div className='col-12 col-md-5 m-1'>
        <FadeTransform in transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
                <Card>
                <CardImg object src={baseUrl + dish.image} 
                alt={dish.name} width='100%'/>
                <CardBody>
                    <CardTitle heading>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
                </Card>
        </FadeTransform>
        </div>
    )
}

const RenderComment = ({comments, postComment, dishId}) => {
                let getDate = (date) => {
                let dateObject = new Date(date).toDateString().slice(3, 10) + ', ' 
                                + new Date(date).toDateString().slice(10);
                

                return(
                    <span>{dateObject}</span>
                )
            }
    return(
        <div className='col-12 col-md-5 m-1'>        
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <Stagger in>
                            {comments.map(co =>
                            <Fade in>
                                <li key={co.id}>
                                <p>{co.comment}</p>
                                <p>-- {co.author}, {getDate(co.date)} </p>
                                </li>
                            </Fade>
                            )}
                        </Stagger>
                    </ul>      
                    <CommentForm dishId={dishId} postComment={postComment} />
      
        </div>
    )
}
const DishDetail = (props) => {
    if(props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if(props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    } else if(props.dish !== null && props.dish !== undefined) {
            return(
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                    <div className="row">
                    <RenderDish dish= {props.dish} />
                    <RenderComment comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id} />
                    </div>
                </div>
            )
        }else {
            return null;
        }
}



export default DishDetail;